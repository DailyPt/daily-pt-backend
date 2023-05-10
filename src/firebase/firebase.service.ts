import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  initializeApp,
  applicationDefault,
  getApps,
  App,
} from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';

@Injectable()
export class FirebaseService {
  public readonly app: App;
  public readonly auth: Auth;
  public readonly firestore: Firestore;
  public readonly storage: Storage;

  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    if (!this.app && getApps().length === 0) {
      if (config.get('APP_ENV') !== 'dev') {
        this.app = initializeApp({
          credential: applicationDefault(),
          projectId: config.get('FIREBASE_PROJECT_ID'),
        });
      } else {
        this.app = initializeApp({
          projectId: config.get('FIREBASE_PROJECT_ID'),
        });
      }
    } else {
      this.app = getApps()[0];
    }

    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }
}
