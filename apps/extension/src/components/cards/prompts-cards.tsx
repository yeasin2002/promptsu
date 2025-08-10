import { Copy, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  description: string;
  author: string;
  onCopy?: () => void;
  onExport?: () => void;
  onExternal?: () => void;
};

export const RoleCard = ({
  title,
  description,
  author,
  onCopy,
  onExport,
}: Props) => {
  return (
    <div className="bg-gray-200 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer group">
      {/* Header with title and arrow */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-black text-lg font-semibold leading-tight pr-4">
          {title}
        </h3>
        <div className="flex-shrink-0">
          <ExternalLink
            className={`w-5 h-5 transition-colors duration-200 text-emerald-400`}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-4">
        {description}
      </p>

      {/* Footer with author and actions */}
      <div className="flex items-center justify-between">
        <span className="text-emerald-400 text-xs font-medium">@{author}</span>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCopy?.();
            }}
            className="p-1.5 text-gray-400 hover:text-emerald-400 transition-colors duration-200 rounded hover:bg-gray-700"
            title="Copy"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExport?.();
            }}
            className="p-1.5 text-gray-400 hover:text-emerald-400 transition-colors duration-200 rounded hover:bg-gray-700"
            title="Export"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
