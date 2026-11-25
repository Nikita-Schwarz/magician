import PocketBase from 'pocketbase';

export const usePocketBase = () => {
  const config = useRuntimeConfig();
  const pb = new PocketBase(config.public.pbUrl);

  // Хелпер для генерации URL картинки с автоматическим ресайзом (например, '800x0')
  const getFileUrl = (record: any, filename: string, thumb?: string) => {
    if (!record || !filename) return '';
    return pb.files.getURL(record, filename, thumb ? { thumb } : undefined);
  };

  return { pb, getFileUrl };
};
