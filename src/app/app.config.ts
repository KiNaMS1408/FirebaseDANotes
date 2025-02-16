import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({"projectId":"danotes-629ac","appId":"1:408194419153:web:a5e1db3b059e28044d38f0","storageBucket":"danotes-629ac.firebasestorage.app","apiKey":"AIzaSyDN08_ZSrPXZULxBuYj0cfgxxnjcz_hU-0","authDomain":"danotes-629ac.firebaseapp.com","messagingSenderId":"408194419153"})),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())]
};
