import { toastController } from "@ionic/core"


export async function success(message: string) {
    const toast = await toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'z-index: 999',
      position: 'top',
      color: 'primary',
    })
    await toast.present()
}