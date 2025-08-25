// In your page file, for example: page.js

import AllDay from "./AllDay"; // Assuming AllDay is in a separate file

export default function VideoHeroPage() {
  return (
    // 1. The main container needs to be 'relative' to position children within it.
    <section className="relative h-screen w-screen">
      
      {/* 2. The video is positioned absolutely to fill the container and sent to the back. */}
      <video
        src="/videos/your-video.mp4"
        poster="/images/video-poster.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* 3. Your text component is also positioned absolutely, brought to the front, and placed. */}
      <div className="absolute left-5 top-5 z-10"> {/* 20px margin */}
        <AllDay />
      </div>

    </section>
  );
}