export interface Note {
    type: "note" | "trash";
    id: string;
    title: string;
    content: string;
    marked: boolean;
}
