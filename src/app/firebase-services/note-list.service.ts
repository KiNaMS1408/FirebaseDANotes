import { Injectable, inject } from '@angular/core';
import { Note } from "../interfaces/note.interface";
import { Firestore, collection, doc, collectionData, onSnapshot} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  items$;
  items;

  unsubList;
  unsubSingle;

  firestore: Firestore = inject(Firestore);
  
  constructor() {

    this.unsubList = onSnapshot(this.getNotesRef(),(list) => {
      list.forEach(element => {
        // dokumenten ID ausloggen lassen
        console.log(element.id);
        // Dokumenten daten
        console.log(element.data());
        // Dokumenten daten mit setNoteObject() Funktion
        console.log(this.setNoteObject(element.data, element.id));
      });
    });
 
    this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "3CkVi2C4d55KgUC1l75T"),(element) => {
    });

    // this.unsubSingle();
    // this.unsubList()

    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe ((list) => {
      list.forEach(element => {
        console.log(element);
      });
    })
  }

  ngonDestroy(){
    this.items.unsubscribe();
  }

  subTrashList(){

  }

  subNotesList(){

  }

  setNoteObject(obj: any, id: string): Note {
    return{
      id: id || "",
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,
    }
  }

  getNotesRef(){
    return collection(this.firestore, 'notes');
  }
  
  getTrashRef(){
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colId:string, docId:string){
    return doc(collection(this.firestore, colId), docId);
  }
}
