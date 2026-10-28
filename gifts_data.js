/**
 * 礼品管理核心数据与持久化模块
 * 存储路径与本地缓存：localStorage & 预设数据
 */

const DEFAULT_GIFTS = [
    {
        id: 'gift-1',
        name: '商务高端定制保温杯礼盒',
        image: './assets/flask.png',
        description: '316L医用级不锈钢内胆，智能触显水温，轻奢商务黑金配色，内含定制金尖签字笔，尊崇致礼。',
        category: '商务办公',
        tags: ['商务甄选', 'VIP定制', '实用轻奢'],
        price: '¥ 299',
        styleRecommendation: 'business'
    },
    {
        id: 'gift-2',
        name: '科技感无线磁吸极速快充底座',
        image: './assets/charger.png',
        description: '三合一折叠悬浮磁吸充电，支持手机/手表/耳机同时快充，航空级铝合金机身，极具极客未来感。',
        category: '数码科技',
        tags: ['数码极客', '桌面美学', '高效便携'],
        price: '¥ 368',
        styleRecommendation: 'vibrant'
    },
    {
        id: 'gift-3',
        name: '匠心国韵 · 宫廷金丝红茶尊享礼盒',
        image: './assets/tea.png',
        description: '精选武夷原产地金骏眉与正山小种，古法手工炒制，烫金雕花礼盒承载东方茶道风雅，心意典藏。',
        category: '茗茶滋补',
        tags: ['国潮非遗', '传统节庆', '高端送礼'],
        price: '¥ 588',
        styleRecommendation: 'business'
    },
    {
        id: 'gift-4',
        name: '文心匠意 · 意式真皮手账笔礼盒',
        image: './assets/notebook.png',
        description: '头层植鞣头层牛皮封面，手工车线装订，配德国进口金尖钢笔与特调墨水，书写温润质感。',
        category: '商务办公',
        tags: ['文艺格调', '手作匠心', '职场精英'],
        price: '¥ 258',
        styleRecommendation: 'business'
    },
    {
        id: 'gift-5',
        name: '纯净原声 · 旗舰无线降噪头戴耳机',
        image: './assets/headphones.png',
        description: '45dB深度混合主动降噪，40mm镀钛振膜动圈单元，60小时持久续航，轻量化蛋白皮耳罩佩戴舒适。',
        category: '数码科技',
        tags: ['音乐发烧', '静谧沉浸', '时尚出街'],
        price: '¥ 699',
        styleRecommendation: 'vibrant'
    },
    {
        id: 'gift-6',
        name: '四季元气 · 环球鲜果伴手礼篮',
        image: './assets/fruit_hamper.png',
        description: '产地直采当季特级车厘子、阳光玫瑰青提与新西兰红啤梨，手工编织自然竹篮搭配喜庆丝带。',
        category: '生鲜果礼',
        tags: ['元气活力', '节日欢庆', '健康美味'],
        price: '¥ 328',
        styleRecommendation: 'vibrant'
    }
];

const STORAGE_KEYS = {
    GIFTS: 'gift_project_items_v1',
    CART: 'gift_project_cart_v1'
};

class GiftStorage {
    static getGifts() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.GIFTS);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.warn('读取本地礼品失败，使用预设数据', e);
        }
        this.saveGifts(DEFAULT_GIFTS);
        return [...DEFAULT_GIFTS];
    }

    static saveGifts(gifts) {
        try {
            localStorage.setItem(STORAGE_KEYS.GIFTS, JSON.stringify(gifts));
        } catch (e) {
            console.error('保存礼品数据失败', e);
        }
    }

    static addGift(gift) {
        const list = this.getGifts();
        const newGift = {
            id: 'gift-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            name: gift.name.trim(),
            image: gift.image || './assets/flask.png',
            description: gift.description.trim(),
            category: gift.category || '精选礼品',
            tags: gift.tags && gift.tags.length > 0 ? gift.tags : ['精品推荐'],
            price: gift.price || '待定',
            styleRecommendation: gift.styleRecommendation || 'business',
            createdAt: Date.now()
        };
        list.unshift(newGift);
        this.saveGifts(list);
        return newGift;
    }

    static updateGift(id, updatedData) {
        const list = this.getGifts();
        const idx = list.findIndex(g => g.id === id);
        if (idx !== -1) {
            list[idx] = { ...list[idx], ...updatedData, updatedAt: Date.now() };
            this.saveGifts(list);
            return list[idx];
        }
        return null;
    }

    static deleteGift(id) {
        let list = this.getGifts();
        list = list.filter(g => g.id !== id);
        this.saveGifts(list);
        // Also remove from cart if present
        this.setQuantity(id, 0);
        return list;
    }

    static resetToDefault() {
        this.saveGifts(DEFAULT_GIFTS);
        return [...DEFAULT_GIFTS];
    }

    // 选礼数量管理 (Cart / Selection Manifest)
    static getCart() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.CART);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    static saveCart(cart) {
        try {
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
        } catch (e) {}
    }

    static setQuantity(giftId, quantity) {
        const cart = this.getCart();
        const qty = parseInt(quantity, 10);
        if (isNaN(qty) || qty <= 0) {
            delete cart[giftId];
        } else {
            cart[giftId] = Math.min(qty, 9999);
        }
        this.saveCart(cart);
        return cart;
    }

    static clearCart() {
        this.saveCart({});
        return {};
    }
}

// 导出全局命名空间供前端页面使用
window.GiftStorage = GiftStorage;
window.DEFAULT_GIFTS = DEFAULT_GIFTS;
