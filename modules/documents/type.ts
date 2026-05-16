export interface DocumentResponseDto {
  DocumentId: string;
  VehicleId: string;
  DocumentType: string;
  FileUrl: string;
  PublicId?: string;
  UploadedAt: Date;
}
