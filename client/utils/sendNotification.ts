async function sendPushNotification() {
    const message = {
        to: "ExponentPushToken[DlAGPCMV_FGr-tdgif2HsP]",
        sound: "default",
        title: "52 A - Bus",
        body: "52 A will arrive in 5 min",
        data: { someData: "goes here" },
    }

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    })
}

export default sendPushNotification
