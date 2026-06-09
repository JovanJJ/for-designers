import ProjectDetailView from "../../../features/project/ProjectDetailView";

export default async function ProjectPage({ params }: { params: { id: string } }) {
    return (
        <main>
            <ProjectDetailView />
        </main>
    );
}
