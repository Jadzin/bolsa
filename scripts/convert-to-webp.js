// Script para converter imagens para o formato WebP
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Obter o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pasta com as imagens originais
const imageFolder = path.join(__dirname, '../attached_assets');

// Extensões de imagem a serem convertidas
const validExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

// Função para converter uma imagem para WebP
async function convertToWebP(filePath) {
  const fileExt = path.extname(filePath).toLowerCase();
  
  // Pula se já for webp ou não for uma imagem válida
  if (fileExt === '.webp' || !validExtensions.includes(fileExt)) {
    return null;
  }
  
  // Define o caminho de saída com extensão .webp
  const fileName = path.basename(filePath, fileExt);
  const outputPath = path.join(path.dirname(filePath), `${fileName}.webp`);
  
  try {
    // Converte a imagem para WebP
    await sharp(filePath)
      .webp({ quality: 80 }) // 80% é um bom equilíbrio entre qualidade e tamanho
      .toFile(outputPath);
    
    console.log(`Convertido: ${filePath} => ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`Erro ao converter ${filePath}:`, error);
    return null;
  }
}

// Função principal para processar todas as imagens
async function convertAllImages() {
  try {
    // Lê todos os arquivos na pasta
    const files = fs.readdirSync(imageFolder);
    
    console.log(`Encontrados ${files.length} arquivos para processar.`);
    
    // Filtra apenas arquivos de imagem com extensões válidas
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return validExtensions.includes(ext);
    });
    
    console.log(`${imageFiles.length} imagens serão convertidas para WebP.`);
    
    // Converte cada imagem
    const promises = imageFiles.map(file => {
      const filePath = path.join(imageFolder, file);
      return convertToWebP(filePath);
    });
    
    // Aguarda todas as conversões
    const results = await Promise.all(promises);
    
    // Conta quantas foram convertidas com sucesso
    const successCount = results.filter(result => result !== null).length;
    console.log(`Conversão concluída! ${successCount} de ${imageFiles.length} imagens convertidas.`);
    
  } catch (error) {
    console.error('Erro ao processar imagens:', error);
  }
}

// Executa o processo de conversão
convertAllImages();