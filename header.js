window.addEventListener('DOMContentLoaded', function () {
    // Create header element
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="header">
            <div class="hero">
                <h1>Welcome to My Site</h1>
                <p>Let's explore!</p>
            </div>
        </div>
    `;

    // Insert the header at the top of the body (before the content)
    document.body.prepend(header);
});
