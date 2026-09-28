document.addEventListener("DOMContentLoaded", function () {
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach(function (pre) {
        // Avoid adding the button twice
        if (pre.querySelector(".copy-code-button")) {
            return;
        }

        const button = document.createElement("button");
        button.className = "copy-code-button";
        button.type = "button";
        button.textContent = "Copy";

        button.addEventListener("click", async function () {
            const code = pre.querySelector("code");

            if (!code) {
                return;
            }

            try {
                await navigator.clipboard.writeText(code.innerText);

                button.textContent = "Copied!";

                setTimeout(function () {
                    button.textContent = "Copy";
                }, 1500);
            } catch (err) {
                console.error("Could not copy code:", err);
                button.textContent = "Failed";

                setTimeout(function () {
                    button.textContent = "Copy";
                }, 1500);
            }
        });

        pre.appendChild(button);
    });
});