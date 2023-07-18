import { useEffect, useState } from "react";
import { UserPhoto } from "./usePhotoGallery";
import { Preferences } from "@capacitor/preferences";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { isPlatform } from "@ionic/react";

export function useGetSavedPictures(storageKey: string) {
  const [savedPhotos, setSavedPhotos] = useState<UserPhoto[]>([]);
  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: storageKey });
      const photosInPreferences = (value ? JSON.parse(value) : []) as UserPhoto[];
      if (!isPlatform("hybrid")) {
        for (let photo of photosInPreferences) {
          const file = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });
          // Web platform only: Load the photo as base64 data
          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setSavedPhotos(photosInPreferences);
    };
    loadSaved();
  }, []);
  return {
    savedPhotos,
  };
}
