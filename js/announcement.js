document.addEventListener("DOMContentLoaded", function () {

    // Change this ID whenever you publish a NEW announcement.
    // That makes previously dismissed announcements appear again.
    const announcementId = "gravito-tcf23-v1";

    const storageKey = "gravito-announcement-dismissed";

    // Has the user already dismissed THIS announcement?
    if (localStorage.getItem(storageKey) === announcementId) {
        return;
    }

    const bar = document.createElement("div");
    bar.className = "gravito-announcement";

    bar.innerHTML = `
        <div class="gravito-announcement-inner">

            <div class="gravito-announcement-message">
                <span class="gravito-announcement-label">NEW</span>

                <span>
                    Gravito CMP now supports <strong>TCF 2.3</strong>
                </span>

                <a href="/Gravito_V6_CMP/">
                    Learn more
                    <span aria-hidden="true">→</span>
                </a>
            </div>

            <button
                class="gravito-announcement-close"
                type="button"
                aria-label="Dismiss announcement"
                title="Dismiss"
            >
                ×
            </button>

        </div>
    `;

    /*
     * ReadTheDocs normally puts the whole site inside
     * .wy-grid-for-nav.
     *
     * Insert BEFORE that wrapper so the announcement isn't
     * placed inside the article/content area.
     */
    const contentWrap = document.querySelector(".wy-nav-content-wrap");

if (contentWrap) {
    contentWrap.insertBefore(bar, contentWrap.firstChild);
} else {
    document.body.insertBefore(bar, document.body.firstChild);
}

    const closeButton = bar.querySelector(".gravito-announcement-close");

    closeButton.addEventListener("click", function () {

        localStorage.setItem(storageKey, announcementId);

        bar.classList.add("gravito-announcement-hidden");

        setTimeout(function () {
            bar.remove();
        }, 200);
    });

});
