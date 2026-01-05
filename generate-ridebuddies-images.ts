import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'public', 'images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateImages() {
  const zai = await ZAI.create();

  const images = [
    {
      name: 'hero-banner.png',
      size: '1440x720' as const,
      prompt: 'Modern car sharing platform hero banner, happy diverse people in cars, cityscape background, bright and welcoming, professional photography, high quality'
    },
    {
      name: 'community-ride.png',
      size: '1344x768' as const,
      prompt: 'Community ride sharing illustration, people smiling and carpooling together, friendly atmosphere, modern colorful design, vector art style'
    },
    {
      name: 'ride-sharing-app.png',
      size: '1024x1024' as const,
      prompt: 'Modern smartphone app showing ride sharing interface, clean UI design, map and locations, professional mockup, white background'
    },
    {
      name: 'logo-ridebuddies.png',
      size: '1024x1024' as const,
      prompt: 'Simple modern logo for ride sharing company, car and people icon together, blue and green gradient, clean minimalist design, white background'
    },
    {
      name: 'driver-welcome.png',
      size: '1344x768' as const,
      prompt: 'Friendly professional driver welcoming passengers in modern car, safe and trustworthy, bright lighting, professional photography'
    },
    {
      name: 'savings-banner.png',
      size: '1152x864' as const,
      prompt: 'Piggy bank with coins and car keys, cost savings concept, money saving illustration, modern flat design, green and gold colors'
    }
  ];

  console.log('Starting image generation...\n');

  for (const image of images) {
    try {
      console.log(`Generating ${image.name}...`);

      const response = await zai.images.generations.create({
        prompt: image.prompt,
        size: image.size
      });

      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');

      const outputPath = path.join(outputDir, image.name);
      fs.writeFileSync(outputPath, buffer);

      console.log(`✓ Saved to ${outputPath}`);
      console.log(`  Size: ${image.size}\n`);
    } catch (error) {
      console.error(`✗ Failed to generate ${image.name}:`, error.message);
      console.log();
    }
  }

  console.log('Image generation complete!');
}

generateImages().catch(console.error);
