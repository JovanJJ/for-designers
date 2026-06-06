import ProjectDetailView from "../../../features/dashboard/ProjectDetailView";

export default async function ProjectPage({ params }: { params: { id: string } }) {
    return (
        <main>
            <ProjectDetailView />
        </main>
    );
}
