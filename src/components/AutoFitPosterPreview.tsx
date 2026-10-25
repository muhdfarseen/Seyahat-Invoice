import { useState, useEffect, useRef } from "react";
import { Box } from "@mantine/core";

interface AutoFitPosterPreviewProps {
  children: React.ReactNode;
  posterWidth?: number;
  posterHeight?: number;
}

export const AutoFitPosterPreview = ({
  children,
  posterWidth = 800,
  posterHeight = 1000,
}: AutoFitPosterPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.6);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      if (!clientWidth || !clientHeight) return;

      // 32px margin total (16px on each side)
      const paddingX = 32;
      const paddingY = 32;

      const availW = Math.max(0, clientWidth - paddingX);
      const availH = Math.max(0, clientHeight - paddingY);

      const calculatedScale = Math.min(availW / posterWidth, availH / posterHeight);
      if (calculatedScale > 0) {
        setScale(calculatedScale);
      }
    };

    updateScale();

    const observer = new ResizeObserver(() => {
      updateScale();
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [posterWidth, posterHeight]);

  return (
    <Box
      ref={containerRef}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#ffffff",
        padding: 16,
      }}
    >
      <Box
        style={{
          width: posterWidth * scale,
          height: posterHeight * scale,
          position: "relative",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            width: posterWidth,
            height: posterHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
