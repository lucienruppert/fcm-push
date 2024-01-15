self.addEventListener("push", () => {
  self.registration.showNotification("test message");
});

self.addEventListener("push", (event) => {
  let pushMessageJSON = event.data.json();
  event.waitUntil(
    self.registration.showNotification(pushMessageJSON.title, {
      body: pushMessageJSON.body,
      tag: pushMessageJSON.tag,
      actions: [
        {
          action: pushMessageJSON.actionURL,
          title: pushMessageJSON.actionTitle,
        },
      ],
    })
  );
});

self.addEventListener('notificationclick', async function(event) {
    if (!event.action)
        return;
    // This always opens a new browser tab,
    // even if the URL happens to already be open in a tab.
    clients.openWindow(event.action);
});