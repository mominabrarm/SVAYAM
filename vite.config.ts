import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite config with optional ElevenLabs TTS proxy route
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'elevenlabs-api-proxy',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/tts' && req.method === 'POST') {
            try {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  const apiKey = process.env.ELEVENLABS_API_KEY;
                  if (!apiKey) {
                    res.writeHead(503, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                      error: 'ELEVENLABS_API_KEY is not configured on server', 
                      fallback: true 
                    }));
                    return;
                  }

                  const { text, voiceId = '21m00Tcm4TlvDq8ikWAM' } = JSON.parse(body);
                  if (!text) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Text is required' }));
                    return;
                  }

                  const elevenRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'xi-api-key': apiKey,
                      'Accept': 'audio/mpeg'
                    },
                    body: JSON.stringify({
                      text,
                      model_id: 'eleven_monolingual_v1',
                      voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75
                      }
                    })
                  });

                  if (!elevenRes.ok) {
                    const errText = await elevenRes.text();
                    res.writeHead(elevenRes.status, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'ElevenLabs API error', details: errText, fallback: true }));
                    return;
                  }

                  const audioBuffer = await elevenRes.arrayBuffer();
                  res.writeHead(200, {
                    'Content-Type': 'audio/mpeg',
                    'Content-Length': audioBuffer.byteLength
                  });
                  res.end(Buffer.from(audioBuffer));
                } catch (err: any) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: err.message || 'Internal proxy error', fallback: true }));
                }
              });
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message || 'Failed processing request' }));
            }
            return;
          }
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
