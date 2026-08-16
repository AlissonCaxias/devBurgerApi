class FormatterTemp {
    formatTimestamp(date) {
        if (!date) return date;
        return new Date(date).toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
        });
    }

    formatData(data) {
        if (!data) return data;
        const formatted = data.toJSON ? data.toJSON() : { ...data };

        const result = { ...formatted };

        if (formatted.createdAt || formatted.created_at) {
            result.created_at = this.formatTimestamp(formatted.createdAt || formatted.created_at);
            delete result.createdAt; // Remove a chave 'createdAt' antiga
        }

        if (formatted.updatedAt || formatted.updated_at) {
            result.updated_at = this.formatTimestamp(formatted.updatedAt || formatted.updated_at);
            delete result.updatedAt; // Remove a chave 'updatedAt' antiga
        }

        return result;
    }
}

export default new FormatterTemp();
