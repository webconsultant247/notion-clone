import {
  initializeApp,
  getApps,
  AppOptions,
  App,
  getApp,
  cert,
} from "firebase-admin/app";

const serviceKey = require("@/service_key.json");
import { getFirestore } from "firebase-admin/firestore";

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
export { app as adminApp, adminDb };
