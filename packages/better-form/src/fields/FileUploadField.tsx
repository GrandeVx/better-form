/**
 * Better Form - FileUploadField
 * File upload field with drag & drop support
 */

'use client';

import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import type { FieldComponentProps } from '../components/WizardField';

export interface FileInfo {
  file?: File;
  name: string;
  size: number;
  type: string;
  url?: string;
  preview?: string;
}

export function FileUploadField({ field, value, onChange, error, disabled }: FieldComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const multiple = field.multiple || false;
  const accept = field.accept || '*/*';
  const maxSize = field.maxSize || 10 * 1024 * 1024; // 10MB default
  const maxFiles = field.maxFiles || 10;

  const files = Array.isArray(value) ? value : value ? [value] : [];

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check size
      if (file.size > maxSize) {
        return `File troppo grande. Massimo ${formatFileSize(maxSize)}`;
      }

      // Check type
      if (accept !== '*/*') {
        const acceptedTypes = accept.split(',').map((t) => t.trim());
        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          if (type.endsWith('/*')) {
            return file.type.startsWith(type.replace('/*', '/'));
          }
          return file.type === type;
        });

        if (!isAccepted) {
          return `Tipo di file non supportato. Accettati: ${accept}`;
        }
      }

      return null;
    },
    [accept, maxSize]
  );

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      setUploadError(null);

      const newFiles: FileInfo[] = [];
      const filesToProcess = Array.from(fileList);

      // Check max files
      if (multiple && files.length + filesToProcess.length > maxFiles) {
        setUploadError(`Massimo ${maxFiles} file consentiti`);
        return;
      }

      for (const file of filesToProcess) {
        const error = validateFile(file);
        if (error) {
          setUploadError(error);
          return;
        }

        const fileInfo: FileInfo = {
          file,
          name: file.name,
          size: file.size,
          type: file.type,
        };

        // Create preview for images
        if (file.type.startsWith('image/')) {
          fileInfo.preview = URL.createObjectURL(file);
        }

        newFiles.push(fileInfo);
      }

      if (multiple) {
        onChange([...files, ...newFiles]);
      } else {
        onChange(newFiles[0] || null);
      }
    },
    [files, multiple, maxFiles, onChange, validateFile]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index: number) => {
    if (multiple) {
      const newFiles = [...files];
      // Revoke preview URL if exists
      if (newFiles[index]?.preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      onChange(newFiles);
    } else {
      if ((value as FileInfo)?.preview) {
        URL.revokeObjectURL((value as FileInfo).preview!);
      }
      onChange(null);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className={`better-form-file-upload ${error ? 'error' : ''}`}>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        className="better-form-file-input"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
      />

      {/* Drop zone */}
      <div
        className={`better-form-file-dropzone ${isDragging ? 'dragging' : ''} ${
          disabled ? 'disabled' : ''
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <div className="better-form-file-dropzone-icon">📁</div>
        <div className="better-form-file-dropzone-text">
          {isDragging ? (
            'Rilascia qui il file'
          ) : (
            <>
              <strong>Clicca per caricare</strong> o trascina qui
            </>
          )}
        </div>
        <div className="better-form-file-dropzone-hint">
          {accept !== '*/*' && `Formati: ${accept}`}
          {maxSize && ` • Max ${formatFileSize(maxSize)}`}
        </div>
      </div>

      {/* Upload error */}
      {uploadError && <div className="better-form-file-error">{uploadError}</div>}

      {/* File list */}
      {files.length > 0 && (
        <div className="better-form-file-list">
          {files.map((fileInfo: FileInfo, index: number) => (
            <div key={index} className="better-form-file-item">
              {fileInfo.preview && (
                <img
                  src={fileInfo.preview}
                  alt={fileInfo.name}
                  className="better-form-file-preview"
                />
              )}
              <div className="better-form-file-info">
                <div className="better-form-file-name">{fileInfo.name}</div>
                <div className="better-form-file-size">{formatFileSize(fileInfo.size)}</div>
              </div>
              <button
                type="button"
                className="better-form-file-remove"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                aria-label={`Rimuovi ${fileInfo.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * ImageUploadField - Specialized for image uploads with preview
 */
export function ImageUploadField(props: FieldComponentProps) {
  const imageAccept = props.field.accept || 'image/*';
  return <FileUploadField {...props} field={{ ...props.field, accept: imageAccept }} />;
}

/**
 * DocumentUploadField - Specialized for document uploads
 */
export function DocumentUploadField(props: FieldComponentProps) {
  const docAccept =
    props.field.accept || '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt,.ods,.odp';
  return <FileUploadField {...props} field={{ ...props.field, accept: docAccept }} />;
}

/**
 * Format file size for display
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

export default FileUploadField;
