export function createQueryString(params: Record<string, string | number | null>): string {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      queryParams.append(key, (value ?? '').toString());
    }
  }

  return '?' + queryParams.toString();
}

export function replaceTemplate(template: string, params: Record<string, string | number | null>): string {
  return template.replace(/\{\{(\w+)}}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      return String(params[key]);
    }
    return match;
  });
}