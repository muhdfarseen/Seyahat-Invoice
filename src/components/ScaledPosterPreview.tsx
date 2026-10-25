import { useState, useEffect, useRef } from "react";
import { Box } from "@mantine/core";

interface ScaledPosterPreviewProps {
  children: React.ReactNode;
  width?: number;
  scale?: number;
}

export const ScaledPosterPreview = ({
  children,
  width = 800,
  scale = 0.72,
}: ScaledPosterPreviewProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (!innerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          setContentHeight(entry.contentRect.height);
        }
      }
    });
    observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      style={{
        width: width * scale,
        height: contentHeight > 0 ? contentHeight * scale : "auto",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        ref={innerRef}
        style={{
          width,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
