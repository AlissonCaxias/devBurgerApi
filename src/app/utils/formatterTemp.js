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
            result.createdAt = result.created_at; // Mantém as duas chaves para não quebrar compatibilidade
        }
        
        if (formatted.updatedAt || formatted.updated_at) {
            result.updated_at = this.formatTimestamp(formatted.updatedAt || formatted.updated_at);
            result.updatedAt = result.updated_at;
        }

        return result;
    }
}

export default new FormatterTemp();
