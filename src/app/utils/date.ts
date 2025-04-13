export const formatDate = (date: Date, locale: string, options?: Intl.DateTimeFormatOptions): string => {
    const _options = options || {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }

    const formatter = new Intl.DateTimeFormat(locale, {
        ..._options,
    });
    return formatter.format(date);
}