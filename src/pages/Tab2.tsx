import {
  IonActionSheet,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { camera, close, trash } from "ionicons/icons";
import "./Tab2.css";
import { UserPhoto, usePhotoGallery } from "../hooks/usePhotoGallery";
import { useState } from "react";

const Tab2: React.FC = () => {
  const { photos, deletePhoto, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  const ionActionSheetTpl = () => {
    return (
      <IonActionSheet
        isOpen={!!photoToDelete}
        buttons={[
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            },
          },
          {
            text: "Cancel",
            icon: close,
            role: "cancel",
          },
        ]}
        onDidDismiss={() => setPhotoToDelete(undefined)}
      />
    );
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={photo.filepath}>
                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        {ionActionSheetTpl()}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
