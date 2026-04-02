import * as Blockly from 'blockly';
import * as JSZip from 'jszip';

function sanitizeFilename(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_{2,}/g, '_'); 
}

export async function saveToProjectData(workspace: Blockly.WorkspaceSvg, projectName: string) {
    return {
        projectName,
        workspace: Blockly.serialization.workspaces.save(workspace),
        projectSettings: {
            size: [1920, 1280]
        },
        projectFormatVersion: 0
    };
}

export async function createFile(
    workspace: Blockly.WorkspaceSvg, 
    projectName: string, 
    thumbnailCanvas: HTMLCanvasElement
): Promise<File> {
    const zip = new JSZip();
    const filename = `${sanitizeFilename(projectName)}.mblks`;

    const projectData = await saveToProjectData(workspace, projectName);
    zip.file("project.json", JSON.stringify(projectData, null, 2));

    const thumbnailBlob = await new Promise<Blob | null>((resolve) => 
        thumbnailCanvas.toBlob((blob) => resolve(blob), 'image/png')
    );

    if (thumbnailBlob) {
        zip.file("thumbnail.png", thumbnailBlob);
    }

    const zipContent = await zip.generateAsync({ type: "blob" });
    
    return new File([zipContent], filename, {
        type: "application/octet-stream"
    });
}

export function loadProject(workspace: Blockly.WorkspaceSvg, projectJson: any) {
    workspace.clear();
    Blockly.serialization.workspaces.load(projectJson.workspace, workspace);
}