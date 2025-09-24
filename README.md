# Mindflow - Personality Assessment Tool

A beautiful, mindful personality assessment tool that uses OpenAI's GPT-4 to provide personalized insights based on 20 scientifically-backed Likert scale questions.

## Features

- 🎨 **Beautiful UI**: Clean, light-toned design with smooth animations
- 📊 **20 Likert Questions**: Comprehensive personality assessment covering Big Five traits plus additional dimensions
- 🤖 **AI-Powered Analysis**: Uses OpenAI GPT-4o-mini for intelligent personality insights
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Real-time Scoring**: Instant calculation of trait scores with reverse-scoring logic
- 🎯 **Actionable Insights**: Practical, non-diagnostic recommendations for personal growth

## Personality Traits Measured

### Big Five Traits
- **Extraversion**: Social energy and assertiveness
- **Conscientiousness**: Organization and self-discipline
- **Emotional Stability**: Resilience and stress management
- **Openness**: Creativity and intellectual curiosity
- **Agreeableness**: Cooperation and empathy

### Additional Dimensions
- **Decisiveness**: Quick decision-making ability
- **Risk Orientation**: Comfort with calculated risks
- **Self-Insight**: Emotional awareness and reflection

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure OpenAI API
Create a `.env` file in the root directory:
```bash
cp env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Start the Server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### 4. Access the Application
Open your browser and visit: http://localhost:3000

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - FREE)
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/mindflow-personality
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `OPENAI_API_KEY`
   - Deploy!

3. **Custom Domain (Optional):**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Configure DNS records

### Option 2: Netlify (FREE)
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop your `dist` folder
   - Configure environment variables

### Option 3: Railway ($5/month credit)
1. **Connect GitHub:**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Add environment variable: `OPENAI_API_KEY`
   - Deploy automatically

## 🌐 Domain Options

### Free Domains:
- **Freenom**: .tk, .ml, .ga, .cf domains (free)
- **GitHub Pages**: yourname.github.io (free)

### Cheap Domains:
- **Namecheap**: $8-12/year for .com
- **Cloudflare**: Domain registration
- **GoDaddy**: Often has discounts

## 💰 Cost Breakdown

| Service | Cost | Features |
|---------|------|----------|
| **Vercel** | FREE | Hosting, CDN, HTTPS, Custom domain |
| **Domain** | $0-12/year | Custom domain name |
| **OpenAI API** | $0.01-0.10/assessment | AI analysis (very cheap) |
| **Total** | **$0-12/year** | Full functionality |

## How It Works

1. **Questionnaire**: Users answer 20 Likert scale questions (1-7 scale)
2. **Scoring**: Responses are automatically scored, with reverse-scoring applied to specific questions
3. **AI Analysis**: Scores are sent to OpenAI GPT-4o-mini for personalized analysis
4. **Results**: Users receive a comprehensive personality report with actionable insights

## Question Mapping

The assessment includes questions that map to specific traits:

- **Extraversion**: Q01, Q07(r), Q13
- **Conscientiousness**: Q02, Q06, Q12, Q17
- **Emotional Stability**: Q03(r), Q08, Q14
- **Openness**: Q04, Q09(r), Q15
- **Agreeableness**: Q05, Q10, Q16(r), Q19
- **Decisiveness**: Q11
- **Risk Orientation**: Q18
- **Self-Insight**: Q20

*(r) indicates reverse-scored items*

## API Endpoints

- `GET /` - Serves the main application
- `POST /api/analyze-personality` - Analyzes personality responses
- `GET /api/health` - Health check endpoint

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **AI**: OpenAI GPT-4o-mini
- **Styling**: Custom CSS with modern gradients and animations

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `PORT` | Server port (default: 3000) | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, please open a GitHub issue or contact the development team.

---

**Note**: This tool is designed for personal development and self-reflection. It is not intended for clinical or diagnostic purposes. Always consult with qualified professionals for serious psychological concerns.
