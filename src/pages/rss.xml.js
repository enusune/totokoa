import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
    return rss({
        title: "Bloooooooooog",
        description: 'AI Tools, Full-Stack Development, and Efficiency Improvement',
        site: context.site,
        items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
        customData: `<language>en</language>`,
    });
}