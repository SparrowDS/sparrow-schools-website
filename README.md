# Sparrow Data Services Website

This is the website for Sparrow Data Services, a data analytics company serving California school districts.

## Files Included

- `index.html` - Home page with services overview and contact form
- `gspp.html` - Golden State Pathways Program support page
- `caaspp.html` - CAASPP analytics page (placeholder)
- `elpac.html` - ELPAC reporting page (placeholder)
- `ca-dashboard.html` - CA Dashboard analysis page (placeholder)
- `styles.css` - All styling for the website
- `script.js` - Interactive functionality (mobile menu, form handling)
- `images/SDS_Logo.png` - Your logo

## How to Publish Your Website

You have several options for hosting your website. Here are the easiest and most cost-effective:

### Option 1: GitHub Pages (Recommended - FREE)

GitHub Pages is free, reliable, and easy to use. Here's how to set it up:

1. **Create a GitHub account** (if you don't have one):
   - Go to https://github.com
   - Click "Sign up" and follow the instructions

2. **Create a new repository**:
   - Click the "+" in the top right corner
   - Select "New repository"
   - Name it: `sparrow-website` (or any name you prefer)
   - Make it **Public**
   - Click "Create repository"

3. **Upload your files**:
   - Click "uploading an existing file"
   - Drag and drop ALL the files from this folder
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Wait 2-3 minutes for the site to deploy
   - Your site will be live at: `https://[your-username].github.io/sparrow-website/`

5. **Connect your custom domain** (sparrowdataservices.com):
   - In GitHub Pages settings, add your custom domain
   - In your domain registrar (where you bought the domain):
     - Add a CNAME record pointing to `[your-username].github.io`
     - Or add A records pointing to GitHub's IPs:
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153
   - Wait for DNS propagation (can take up to 24 hours)

### Option 2: Netlify (Also FREE and Very Easy)

Netlify is another great free option with a simple drag-and-drop interface:

1. **Create a Netlify account**:
   - Go to https://www.netlify.com
   - Click "Sign up" (you can use your GitHub account)

2. **Deploy your site**:
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the entire folder containing your website files
   - Your site will be live instantly at a Netlify URL

3. **Connect your custom domain**:
   - In your site settings, click "Domain management"
   - Click "Add custom domain"
   - Enter: `sparrowdataservices.com`
   - Follow the instructions to update your domain's DNS settings
   - Netlify will provide the DNS records you need to add

### Option 3: Traditional Web Hosting

If you prefer traditional hosting (GoDaddy, Bluebird, HostGator, etc.):

1. Purchase a hosting plan (usually $3-10/month)
2. Use their file manager or FTP to upload all files
3. Point your domain to their nameservers
4. Files should be uploaded to the `public_html` or `www` folder

## Updating Your Website

To update content:

1. Edit the HTML files in a text editor (Notepad++, VS Code, or even Notepad)
2. Save your changes
3. Re-upload the modified files to your hosting service

### Quick Edits You'll Want to Make:

- **Adding sample reports/dashboards**: Edit the placeholder sections in each service page
- **Updating contact info**: Change email address in the HTML files if needed
- **Modifying services**: Edit the service card sections in each page
- **Changing colors**: Update the CSS variables in `styles.css`

## Form Functionality

The contact form currently opens the user's default email client with a pre-filled message. This works without any server-side setup.

If you want forms to be submitted directly to a database or email service:
- Use Netlify Forms (free with Netlify hosting)
- Use Formspree (https://formspree.io) - free for up to 50 submissions/month
- Use Google Forms and embed it

## Mobile Responsiveness

The website is fully responsive and looks great on phones, tablets, and desktops. No additional work needed!

## Need Help?

If you run into any issues during deployment:
1. Check your domain registrar's documentation for DNS settings
2. Both GitHub Pages and Netlify have excellent documentation and support
3. The most common issue is DNS propagation time - be patient, it can take up to 24 hours

## Future Enhancements

When you're ready to add more features:
- Interactive Power BI dashboards (requires Microsoft embedding)
- Blog section for educational content
- Client portal for secure file uploads
- Email newsletter signup
- Analytics tracking (Google Analytics)

Good luck with your launch!
