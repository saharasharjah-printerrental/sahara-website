import { FilterXSS, getDefaultWhiteList, escapeAttrValue } from 'xss';

const whiteList = getDefaultWhiteList();
for (const attributes of Object.values(whiteList)) attributes.push('class');
whiteList.iframe = ['src', 'title', 'width', 'height', 'allowfullscreen', 'loading'];

const filter = new FilterXSS({
  whiteList,
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style', 'svg', 'math', 'object', 'template'],
  onTagAttr(tag, name, value) {
    if (tag === 'iframe' && name === 'src') {
      try {
        const url = new URL(value);
        if (url.protocol === 'https:' &&
            ['www.youtube.com', 'www.youtube-nocookie.com'].includes(url.hostname) &&
            url.pathname.startsWith('/embed/')) return `src="${escapeAttrValue(url.href)}"`;
      } catch { /* Reject non-absolute embed URLs. */ }
      return '';
    }
  },
});

// Shared by the edge renderer and editor; never insert stored HTML without this boundary.
export function sanitizeHtml(value: string): string {
  return filter.process(typeof value === 'string' ? value : '');
}
