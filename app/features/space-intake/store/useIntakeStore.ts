import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type MarkerType = 'socket' | 'switch' | 'radiator' | 'window' | 'door' | 'other';

export interface Marker {
  id: string;
  type: MarkerType;
  position_x_pct: number;
  position_y_pct: number;
  width: number;
  height: number;
  distance_from_left: number;
  distance_from_floor: number;
  depth?: number; // Used specifically for 'radiator'
}

export interface RoomMetadata {
  height: number;
  geometryType: 'STANDARD' | 'CUSTOM';
  hasAngledWalls: boolean;
  hasCurvedWalls: boolean;
}

interface IntakeState {
  // Global Room State
  roomId: string | null;
  roomMetadata: RoomMetadata | null;
  currentSequenceOrder: number;

  // Current Wall State
  currentWallImage: string | null;
  currentWallLength: number | null;
  currentWallMarkers: Marker[];
  
  // Geometry
  currentWallIsCurved: boolean;
  currentWallCurveChord?: number;
  currentWallCurveDepth?: number;
  currentWallCurveDirection?: 'inward' | 'outward';
  
  // Floor Plan Angles vs Sloped Ceilings
  currentWallIsFloorPlanAngled: boolean;
  currentWallHasSlopedCeiling: boolean;
  currentWallParapetHeight: number | null;
  currentWallCeilingSlopeLength: number | null;

  // Custom Height Overrides
  currentWallHasCustomHeight: boolean;
  currentWallCustomHeight: number | null;

  // Actions
  setRoomId: (id: string | null) => void;
  setRoomMetadata: (metadata: RoomMetadata | null) => void;
  
  // Wall Actions
  setCurrentWallImage: (imageUrl: string | null) => void;
  clearCurrentWallImage: () => void;
  setCurrentWallLength: (length: number | null) => void;
  setHasCustomHeight: (hasCustomHeight: boolean) => void;
  setCustomWallHeight: (height: number | null) => void;
  
  updateWallProperties: (props: Partial<Pick<IntakeState, 
    | 'currentWallIsCurved' 
    | 'currentWallCurveChord' 
    | 'currentWallCurveDepth' 
    | 'currentWallCurveDirection' 
    | 'currentWallIsFloorPlanAngled'
    | 'currentWallHasSlopedCeiling'
    | 'currentWallParapetHeight'
    | 'currentWallCeilingSlopeLength'
    | 'currentWallLength'
    | 'currentWallHasCustomHeight'
    | 'currentWallCustomHeight'
  >>) => void;
  
  clearWallData: () => void;
  
  // Marker Actions
  addMarker: (marker: Marker) => void;
  updateMarker: (id: string, updatedMarker: Marker) => void;
  removeMarker: (markerId: string) => void;
  clearCurrentWallMarkers: () => void;
  
  // Flow Actions
  nextWall: () => void;
  resetStore: () => void;
}

const initialState = {
  roomId: null,
  roomMetadata: null,
  currentSequenceOrder: 1,
  currentWallImage: null,
  currentWallLength: null,
  currentWallMarkers: [],
  currentWallIsCurved: false,
  currentWallIsFloorPlanAngled: false,
  currentWallHasSlopedCeiling: false,
  currentWallParapetHeight: null,
  currentWallCeilingSlopeLength: null,
  currentWallHasCustomHeight: false,
  currentWallCustomHeight: null,
};

export const useIntakeStore = create<IntakeState>()(
  persist(
    (set) => ({
      ...initialState,

      setRoomId: (roomId) => set({ roomId }),

      setRoomMetadata: (roomMetadata) => set({ roomMetadata }),

      setCurrentWallImage: (currentWallImage) => set({ currentWallImage }),

      clearCurrentWallImage: () => set({ currentWallImage: null }),

      setCurrentWallLength: (currentWallLength) => set({ currentWallLength }),

      setHasCustomHeight: (currentWallHasCustomHeight) => set((state) => ({
        currentWallHasCustomHeight,
        currentWallCustomHeight: currentWallHasCustomHeight ? state.currentWallCustomHeight : null
      })),

      setCustomWallHeight: (currentWallCustomHeight) => set({ currentWallCustomHeight }),

      updateWallProperties: (props) => set((state) => {
        const nextState = { ...state, ...props };
        
        // Logical Reset: If sloped ceiling is disabled, clear its dimensions
        if (props.currentWallHasSlopedCeiling === false) {
          nextState.currentWallParapetHeight = null;
          nextState.currentWallCeilingSlopeLength = null;
        }

        // Logical Reset: If custom height is disabled, clear its value
        if (props.currentWallHasCustomHeight === false) {
          nextState.currentWallCustomHeight = null;
        }
        
        return nextState;
      }),

      clearWallData: () => set((state) => ({
        ...state,
        currentWallImage: null,
        currentWallLength: null,
        currentWallMarkers: [],
        currentWallIsCurved: false,
        currentWallIsFloorPlanAngled: false,
        currentWallHasSlopedCeiling: false,
        currentWallParapetHeight: null,
        currentWallCeilingSlopeLength: null,
        currentWallCurveChord: undefined,
        currentWallCurveDepth: undefined,
        currentWallCurveDirection: undefined,
        currentWallHasCustomHeight: false,
        currentWallCustomHeight: null,
      })),

      addMarker: (marker) =>
        set((state) => ({
          currentWallMarkers: [...state.currentWallMarkers, marker],
        })),

      updateMarker: (id, updatedMarker) =>
        set((state) => ({
          currentWallMarkers: state.currentWallMarkers.map((m) =>
            m.id === id ? updatedMarker : m
          ),
        })),

      removeMarker: (markerId) =>
        set((state) => ({
          currentWallMarkers: state.currentWallMarkers.filter((m) => m.id !== markerId),
        })),

      clearCurrentWallMarkers: () => set({ currentWallMarkers: [] }),

      nextWall: () =>
        set((state) => ({
          ...state,
          currentSequenceOrder: state.currentSequenceOrder + 1,
          currentWallMarkers: [],
          currentWallImage: null,
          currentWallLength: null,
          currentWallIsCurved: false,
          currentWallIsFloorPlanAngled: false,
          currentWallHasSlopedCeiling: false,
          currentWallParapetHeight: null,
          currentWallCeilingSlopeLength: null,
          currentWallCurveChord: undefined,
          currentWallCurveDepth: undefined,
          currentWallCurveDirection: undefined,
          currentWallHasCustomHeight: false,
          currentWallCustomHeight: null,
        })),

      resetStore: () => set(initialState),
    }),
    {
      name: 'space-intake-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
