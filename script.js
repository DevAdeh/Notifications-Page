const notifications = [
  {
    id: 1,
    name: "Mark Webber",
    avatar: "./assets/images/avatar-mark-webber.webp",
    action: "reacted to your recent post",
    target: "My first tournament today!",
    targetType: "post",
    time: "1m ago",
    unread: true
  },
  {
    id: 2,
    name: "Angela Gray",
    avatar: "./assets/images/avatar-angela-gray.webp",
    action: "followed you",
    time: "5m ago",
    unread: true
  },
  {
    id: 3,
    name: "Jacob Thompson",
    avatar: "./assets/images/avatar-jacob-thompson.webp",
    action: "has joined your group",
    target: "Chess Club",
    targetType: "group",
    time: "1 day ago",
    unread: true
  },
  {
    id: 4,
    name: "Rizky Hasanuddin",
    avatar: "./assets/images/avatar-rizky-hasanuddin.webp",
    action: "sent you a private message",
    time: "5 days ago",
    unread: false,
    message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game."
  },
  {
    id: 5,
    name: "Kimberly Smith",
    avatar: "./assets/images/avatar-kimberly-smith.webp",
    action: "commented on your picture",
    time: "1 week ago",
    unread: false,
    image: "./assets/images/image-chess.webp"
  },
  {
    id: 6,
    name: "Nathan Peterson",
    avatar: "./assets/images/avatar-nathan-peterson.webp",
    action: "reacted to your recent post",
    target: "5 end-game strategies to increase your win rate",
    targetType: "post",
    time: "2 weeks ago",
    unread: false
  },
  {
    id: 7,
    name: "Anna Kim",
    avatar: "./assets/images/avatar-anna-kim.webp",
    action: "left the group",
    target: "Chess Club",
    targetType: "group",
    time: "2 weeks ago",
    unread: false
  }
];

const list = document.querySelector(".notifications-list");
const unreadCount = document.querySelector(".unread-count");
const markReadButton = document.querySelector(".mark-read");
const liveRegion = document.querySelector(".sr-only");

function getUnreadCount() {
  return notifications.filter((notification) => notification.unread).length;
}

function renderNotifications() {
  list.innerHTML = notifications.map((notification) => {
    const target = notification.target
      ? `<a href="#" class="${notification.targetType === "group" ? "group-link" : "post-link"}">${notification.target}</a>`
      : "";

    const unreadDot = notification.unread
      ? '<span class="unread-dot" aria-label="unread"></span>'
      : "";

    const message = notification.message
      ? `<p class="message">${notification.message}</p>`
      : "";

    const commentImage = notification.image
      ? `<img class="comment-image" src="${notification.image}" alt="Chess Club post">`
      : "";

    return `
      <article class="notification ${notification.unread ? "unread" : ""}">
        <img class="avatar" src="${notification.avatar}" alt="">
        <div class="notification-content">
          <div class="comment-row">
            <p class="notification-text">
              <span class="user-name">${notification.name}</span>
              ${notification.action} ${target}${unreadDot}
            </p>
            ${commentImage}
          </div>
          <time class="timestamp">${notification.time}</time>
          ${message}
        </div>
      </article>
    `;
  }).join("");

  const count = getUnreadCount();
  unreadCount.textContent = count;
  unreadCount.setAttribute("aria-label", `${count} unread notifications`);
  unreadCount.hidden = count === 0;
}

markReadButton.addEventListener("click", () => {
  notifications.forEach((notification) => {
    notification.unread = false;
  });

  renderNotifications();
  liveRegion.textContent = "All notifications have been marked as read.";
});

renderNotifications();
