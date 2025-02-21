class BouncingScreensaver {
    constructor(container = document.body, image = 'storage/samples/chad.png', speed = 1) {
        this.container = container;
        this.container.style.position = 'absolute';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.overflow = 'hidden';
        this.container.style.zIndex = '9999';
        // Attempt to use an image
        this.elem = document.createElement('img');
        this.elem.src = image;
        this.elem.style.position = 'absolute';
        this.container.appendChild(this.elem);

        // Set initial speeds
        this.dx = speed / 5;
        this.dy = speed / 5;

        // Set a random starting position upon image load.
        this.elem.onload = () => {
            this.elemWidth = this.elem.naturalWidth;
            this.elemHeight = this.elem.naturalHeight;
            const maxX = Math.max(this.container.clientWidth - this.elemWidth, 0);
            const maxY = Math.max(this.container.clientHeight - this.elemHeight, 0);
            this.x = Math.random() * maxX;
            this.y = Math.random() * maxY;
            this.elem.style.left = this.x + 'px';
            this.elem.style.top = this.y + 'px';
            this.animate();
        };

        // If the image fails to load, fallback to a text element.
        this.elem.onerror = () => {
            this.container.removeChild(this.elem);
            // Create a text element as a fallback.
            function createFallbackText() {
                const element = document.createElement('div');
                element.textContent = 'Loading';
                element.style.position = 'absolute';
                element.style.fontFamily = 'inherit';
                element.style.fontSize = '20px';
                element.style.color = 'white';
                return element;
            }
            this.elem = createFallbackText();
            this.container.appendChild(this.elem);
            // Measure dimensions after the element renders
            setTimeout(() => {
                const rect = this.elem.getBoundingClientRect();
                this.elemWidth = rect.width;
                this.elemHeight = rect.height;
                const maxX = Math.max(this.container.clientWidth - this.elemWidth, 0);
                const maxY = Math.max(this.container.clientHeight - this.elemHeight, 0);
                this.x = Math.random() * maxX;
                this.y = Math.random() * maxY;
                this.elem.style.left = this.x + 'px';
                this.elem.style.top = this.y + 'px';
                this.animate();
            }, 0);
        };
    }
    
    animate() {
        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientHeight;
        this.x += this.dx;
        this.y += this.dy;
        
        // Handle left/right side collisions
        if (this.x <= 0) {
            this.x = 0;
            this.dx = Math.abs(this.dx);
        } else if (this.x + this.elemWidth >= containerWidth) {
            this.x = containerWidth - this.elemWidth;
            this.dx = -Math.abs(this.dx);
        }
        
        // Handle top/bottom side collisions
        if (this.y <= 0) {
            this.y = 0;
            this.dy = Math.abs(this.dy);
        } else if (this.y + this.elemHeight >= containerHeight) {
            this.y = containerHeight - this.elemHeight;
            this.dy = -Math.abs(this.dy);
        }
        
        // Update positioning
        this.elem.style.left = this.x + 'px';
        this.elem.style.top = this.y + 'px';
        requestAnimationFrame(() => this.animate());
    }
}
export { BouncingScreensaver };
