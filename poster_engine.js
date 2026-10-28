/**
 * 礼品宣传图生成引擎 (PosterEngine)
 * 支持 商务 (4款变体) 与 活力 (4款变体) 高清多比例海报渲染
 * 支持基于礼品图片生成，以及纯文字排版艺术海报生成
 */

const POSTER_ASPECT_RATIOS = {
    '9:16': { width: 1080, height: 1920, label: '9:16 手机海报/朋友圈' },
    '3:4':  { width: 1200, height: 1600, label: '3:4 小红书/商品卡片' },
    '1:1':  { width: 1200, height: 1200, label: '1:1 正方形展示/头像' }
};

const POSTER_VARIANTS = [
    // 商务风格 (Business Styles)
    {
        id: 'biz_black_gold',
        style: 'business',
        styleName: '商务风格',
        name: '尊贵黑金版',
        badge: 'VIP EXCLUSIVE',
        bgType: 'gradient',
        theme: {
            bg1: '#12161F',
            bg2: '#080A0E',
            accent: '#D4AF37',
            accentLight: '#F3E5AB',
            accentDark: '#8C7026',
            textPrimary: '#FFFFFF',
            textSecondary: '#A0AEC0',
            cardBg: 'rgba(255, 255, 255, 0.04)',
            borderColor: 'rgba(212, 175, 55, 0.35)',
            tagBg: '#D4AF37',
            tagColor: '#0A0D14'
        }
    },
    {
        id: 'biz_minimal_white',
        style: 'business',
        styleName: '商务风格',
        name: '现代极简白',
        badge: 'EXECUTIVE COLLECTION',
        bgType: 'gradient',
        theme: {
            bg1: '#F8FAFC',
            bg2: '#EDF2F7',
            accent: '#1E293B',
            accentLight: '#475569',
            accentDark: '#0F172A',
            textPrimary: '#0F172A',
            textSecondary: '#64748B',
            cardBg: 'rgba(255, 255, 255, 0.85)',
            borderColor: 'rgba(15, 23, 42, 0.12)',
            tagBg: '#0F172A',
            tagColor: '#FFFFFF'
        }
    },
    {
        id: 'biz_royal_navy',
        style: 'business',
        styleName: '商务风格',
        name: '深邃藏蓝格调',
        badge: 'ROYAL PRESTIGE',
        bgType: 'gradient',
        theme: {
            bg1: '#0F1E36',
            bg2: '#060B14',
            accent: '#E2B170',
            accentLight: '#FCE7C8',
            accentDark: '#A67332',
            textPrimary: '#FFFFFF',
            textSecondary: '#94A3B8',
            cardBg: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(226, 177, 112, 0.3)',
            tagBg: '#E2B170',
            tagColor: '#0A111E'
        }
    },
    {
        id: 'biz_emerald',
        style: 'business',
        styleName: '商务风格',
        name: '雅致墨玉典藏',
        badge: 'HERITAGE LUXURY',
        bgType: 'gradient',
        theme: {
            bg1: '#0E2A24',
            bg2: '#071512',
            accent: '#D4AF37',
            accentLight: '#FDE047',
            accentDark: '#854D0E',
            textPrimary: '#F0FDF4',
            textSecondary: '#86EFAC',
            cardBg: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(212, 175, 55, 0.3)',
            tagBg: '#D4AF37',
            tagColor: '#071512'
        }
    },
    // 活力风格 (Vibrant Styles)
    {
        id: 'vib_warm_amber',
        style: 'vibrant',
        styleName: '活力风格',
        name: '暖阳落日橙',
        badge: 'TRENDY GIFT',
        bgType: 'gradient',
        theme: {
            bg1: '#FFF7ED',
            bg2: '#FED7AA',
            accent: '#EA580C',
            accentLight: '#FDBA74',
            accentDark: '#9A3412',
            textPrimary: '#431407',
            textSecondary: '#7C2D12',
            cardBg: 'rgba(255, 255, 255, 0.88)',
            borderColor: 'rgba(234, 88, 12, 0.25)',
            tagBg: '#EA580C',
            tagColor: '#FFFFFF'
        }
    },
    {
        id: 'vib_cyber_pop',
        style: 'vibrant',
        styleName: '活力风格',
        name: '赛博极光潮酷',
        badge: 'FUTURE VIBES',
        bgType: 'cyber',
        theme: {
            bg1: '#1E1B4B',
            bg2: '#0F172A',
            accent: '#06B6D4',
            accentLight: '#A855F7',
            accentDark: '#0891B2',
            textPrimary: '#FFFFFF',
            textSecondary: '#CBD5E1',
            cardBg: 'rgba(30, 27, 75, 0.6)',
            borderColor: 'rgba(6, 182, 212, 0.45)',
            tagBg: '#A855F7',
            tagColor: '#FFFFFF'
        }
    },
    {
        id: 'vib_festive_red',
        style: 'vibrant',
        styleName: '活力风格',
        name: '盛典欢庆红',
        badge: 'CELEBRATION',
        bgType: 'festive',
        theme: {
            bg1: '#991B1B',
            bg2: '#450A0A',
            accent: '#FBBF24',
            accentLight: '#FEF08A',
            accentDark: '#B45309',
            textPrimary: '#FFFFFF',
            textSecondary: '#FECACA',
            cardBg: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(251, 191, 36, 0.4)',
            tagBg: '#FBBF24',
            tagColor: '#7F1D1D'
        }
    },
    {
        id: 'vib_fresh_mint',
        style: 'vibrant',
        styleName: '活力风格',
        name: '薄荷清新蓝绿',
        badge: 'FRESH & ENERGY',
        bgType: 'gradient',
        theme: {
            bg1: '#ECFDF5',
            bg2: '#A7F3D0',
            accent: '#059669',
            accentLight: '#34D399',
            accentDark: '#065F46',
            textPrimary: '#064E3B',
            textSecondary: '#047857',
            cardBg: 'rgba(255, 255, 255, 0.85)',
            borderColor: 'rgba(5, 150, 105, 0.25)',
            tagBg: '#059669',
            tagColor: '#FFFFFF'
        }
    }
];

class PosterEngine {
    /**
     * 加载图片为 Image 对象
     */
    static loadImage(src) {
        return new Promise((resolve, reject) => {
            if (!src) {
                resolve(null);
                return;
            }
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = (e) => {
                console.warn('图片载入失败:', src, e);
                resolve(null);
            };
            img.src = src;
        });
    }

    /**
     * 辅助画圆角矩形
     */
    static roundRect(ctx, x, y, width, height, radius) {
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            radius = Object.assign({ tl: 0, tr: 0, br: 0, bl: 0 }, radius);
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
    }

    /**
     * 自动换行文字计算与绘制
     */
    static wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
        if (!text) return y;
        const words = text.split('');
        let line = '';
        let lineCount = 0;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                if (lineCount === maxLines - 1) {
                    ctx.fillText(line + '...', x, y);
                    return y + lineHeight;
                }
                ctx.fillText(line, x, y);
                line = words[n];
                y += lineHeight;
                lineCount++;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
        return y + lineHeight;
    }

    /**
     * 核心渲染函数：根据变体配置与参数绘制海报到 Canvas
     */
    static async renderVariant(variant, data, options = {}) {
        const ratioKey = options.aspectRatio || '9:16';
        const { width, height } = POSTER_ASPECT_RATIOS[ratioKey] || POSTER_ASPECT_RATIOS['9:16'];

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        const theme = variant.theme;
        const isDark = variant.style === 'business' ? (variant.id !== 'biz_minimal_white') : (variant.id === 'vib_cyber_pop' || variant.id === 'vib_festive_red');

        // 1. 绘制背景层
        this.drawBackground(ctx, width, height, variant);

        // 2. 绘制设计装饰边框与纹理
        this.drawDecorativeElements(ctx, width, height, variant);

        // 3. 绘制顶部品牌与头部区域 (Header & Badges)
        const headerBottomY = this.drawHeader(ctx, width, height, variant, data);

        // 4. 绘制礼品视觉主体 (图片或纯文字艺术图形)
        let productImg = null;
        if (data.image) {
            productImg = await this.loadImage(data.image);
        }

        const visualArea = this.drawVisualSubject(ctx, width, height, variant, productImg, data, headerBottomY);

        // 5. 绘制信息卡片与文本排版 (Product Details, Price & Slogan)
        this.drawContentCard(ctx, width, height, variant, data, visualArea);

        // 6. 绘制底部品牌声明与防伪章
        this.drawFooter(ctx, width, height, variant, data);

        return canvas;
    }

    /**
     * 绘制背景
     */
    static drawBackground(ctx, w, h, variant) {
        const theme = variant.theme;
        const grad = ctx.createLinearGradient(0, 0, w * 0.4, h);
        grad.addColorStop(0, theme.bg1);
        grad.addColorStop(1, theme.bg2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // 特殊风格背景特效
        if (variant.bgType === 'cyber') {
            // 赛博光晕与科技网格
            const radial = ctx.createRadialGradient(w * 0.5, h * 0.35, 50, w * 0.5, h * 0.35, w * 0.7);
            radial.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
            radial.addColorStop(0.5, 'rgba(168, 85, 247, 0.15)');
            radial.addColorStop(1, 'transparent');
            ctx.fillStyle = radial;
            ctx.fillRect(0, 0, w, h);

            // 极光斜线
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 1;
            for (let i = -w; i < w * 2; i += 60) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i + h * 0.6, h);
                ctx.stroke();
            }
        } else if (variant.bgType === 'festive') {
            // 盛典红金背景闪烁粒子光晕
            const radial = ctx.createRadialGradient(w * 0.5, h * 0.4, 80, w * 0.5, h * 0.4, w * 0.8);
            radial.addColorStop(0, 'rgba(251, 191, 36, 0.25)');
            radial.addColorStop(1, 'transparent');
            ctx.fillStyle = radial;
            ctx.fillRect(0, 0, w, h);

            // 绘制金色喜庆微粒
            ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
            for (let i = 0; i < 40; i++) {
                const rx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
                const ry = (Math.cos(i * 37) * 0.5 + 0.5) * h;
                const size = (i % 4) + 2;
                ctx.beginPath();
                ctx.arc(rx, ry, size, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (variant.style === 'business') {
            // 商务高端同心径向光晕与微细点阵
            const radial = ctx.createRadialGradient(w * 0.5, h * 0.38, 40, w * 0.5, h * 0.38, w * 0.65);
            radial.addColorStop(0, variant.id === 'biz_minimal_white' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(212, 175, 55, 0.12)');
            radial.addColorStop(1, 'transparent');
            ctx.fillStyle = radial;
            ctx.fillRect(0, 0, w, h);
        } else if (variant.style === 'vibrant') {
            // 活力圆圈波普散落
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.beginPath();
            ctx.arc(w * 0.85, h * 0.15, 140, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w * 0.1, h * 0.55, 100, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    /**
     * 绘制装饰框架与边饰
     */
    static drawDecorativeElements(ctx, w, h, variant) {
        const theme = variant.theme;
        const margin = Math.round(w * 0.045);

        if (variant.style === 'business') {
            // 经典商务双细线框与四角几何饰角
            ctx.save();
            ctx.strokeStyle = theme.borderColor;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);

            // 内细框
            ctx.strokeStyle = theme.borderColor;
            ctx.lineWidth = 0.8;
            ctx.strokeRect(margin + 12, margin + 12, w - (margin + 12) * 2, h - (margin + 12) * 2);

            // 四角金属切角标识
            const cornerSize = 24;
            const corners = [
                [margin + 12, margin + 12],
                [w - margin - 12, margin + 12],
                [margin + 12, h - margin - 12],
                [w - margin - 12, h - margin - 12]
            ];
            ctx.fillStyle = theme.accent;
            corners.forEach(([cx, cy]) => {
                ctx.beginPath();
                ctx.arc(cx, cy, 3, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();
        } else {
            // 活力风格圆润胶囊装饰或跳动彩条
            ctx.save();
            ctx.strokeStyle = theme.borderColor;
            ctx.lineWidth = 2;
            this.roundRect(ctx, margin, margin, w - margin * 2, h - margin * 2, 28);
            ctx.stroke();
            ctx.restore();
        }
    }

    /**
     * 绘制顶部 Header 区域
     */
    static drawHeader(ctx, w, h, variant, data) {
        const theme = variant.theme;
        const startY = Math.round(h * 0.065);

        ctx.save();
        ctx.textAlign = 'left';

        // 品牌名 / 策划机构
        const brand = data.brand || 'PREMIUM GIFT STUDIO · 礼品甄选';
        ctx.font = '600 24px "Noto Sans SC", "PingFang SC", sans-serif';
        ctx.fillStyle = theme.textSecondary;
        ctx.fillText(brand.toUpperCase(), w * 0.08, startY);

        // 顶部风格徽章 (如 VIP EXCLUSIVE / POPULAR GIFT)
        const badgeText = data.badgeText || variant.badge || '甄选好礼';
        ctx.font = 'bold 22px "Noto Sans SC", sans-serif';
        const badgeWidth = ctx.measureText(badgeText).width + 36;
        const badgeX = w * 0.92 - badgeWidth;
        const badgeY = startY - 24;

        ctx.fillStyle = theme.tagBg;
        this.roundRect(ctx, badgeX, badgeY, badgeWidth, 34, 17);
        ctx.fill();

        ctx.fillStyle = theme.tagColor;
        ctx.textAlign = 'center';
        ctx.fillText(badgeText, badgeX + badgeWidth / 2, badgeY + 24);

        // 分割细线
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w * 0.08, startY + 22);
        ctx.lineTo(w * 0.92, startY + 22);
        ctx.stroke();

        ctx.restore();
        return startY + 35;
    }

    /**
     * 绘制礼品视觉主体 (支持图片或纯文本抽象视觉艺术)
     */
    static drawVisualSubject(ctx, w, h, variant, img, data, topLimitY) {
        const theme = variant.theme;
        // 计算产品视觉主展示区大小与中心
        const isSquare = w === h;
        const visualHeightRatio = isSquare ? 0.44 : 0.46;
        const areaW = w * 0.84;
        const areaH = h * visualHeightRatio;
        const cx = w * 0.5;
        const cy = topLimitY + areaH * 0.5 + 20;

        ctx.save();

        // 1. 展台与悬浮光晕 (Pedestal / Podium)
        const podW = areaW * 0.72;
        const podH = 34;
        const podY = cy + areaH * 0.38;

        // 展台柔和阴影
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.beginPath();
        ctx.ellipse(cx, podY + 12, podW * 0.55, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // 展台主体圆盘
        const podGrad = ctx.createLinearGradient(cx - podW * 0.5, podY, cx + podW * 0.5, podY);
        if (variant.style === 'business') {
            podGrad.addColorStop(0, 'rgba(212, 175, 55, 0.15)');
            podGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.45)');
            podGrad.addColorStop(1, 'rgba(212, 175, 55, 0.15)');
        } else {
            podGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
            podGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.6)');
            podGrad.addColorStop(1, 'rgba(255, 255, 255, 0.25)');
        }
        ctx.fillStyle = podGrad;
        ctx.beginPath();
        ctx.ellipse(cx, podY, podW * 0.5, podH * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // 展台边缘描金/高光
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // 2. 如果存在图片：绘制产品图主体
        if (img) {
            const maxImgW = areaW * 0.85;
            const maxImgH = areaH * 0.82;
            const imgAspect = img.width / img.height;
            let drawW = maxImgW;
            let drawH = drawW / imgAspect;

            if (drawH > maxImgH) {
                drawH = maxImgH;
                drawW = drawH * imgAspect;
            }

            const imgX = cx - drawW / 2;
            const imgY = podY - drawH * 0.92;

            // 产品柔和边缘漫反射发光
            ctx.shadowColor = variant.style === 'business' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(234, 88, 12, 0.25)';
            ctx.shadowBlur = 30;
            ctx.shadowOffsetY = 15;

            // 绘制产品图片
            ctx.drawImage(img, imgX, imgY, drawW, drawH);
            ctx.restore();
        } else {
            // 3. 纯文本模式：绘制高质感 3D 礼品几何勋章艺术图形
            ctx.restore();
            this.drawTextOnlyArtEmblem(ctx, cx, cy - 20, areaW * 0.6, variant, data);
        }

        return {
            bottomY: podY + 25,
            centerX: cx
        };
    }

    /**
     * 当没有图片时，生成极具设计美感与视觉张力的礼品艺术徽章图形
     */
    static drawTextOnlyArtEmblem(ctx, cx, cy, size, variant, data) {
        const theme = variant.theme;
        ctx.save();

        // 艺术光环
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
        ctx.stroke();

        // 虚线外环
        ctx.setLineDash([8, 8]);
        ctx.strokeStyle = theme.accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, size * 0.54, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // 立体礼盒徽标图案
        const boxSize = size * 0.45;
        const bx = cx - boxSize / 2;
        const by = cy - boxSize / 2;

        // 礼盒下底
        ctx.fillStyle = theme.accentDark;
        this.roundRect(ctx, bx, by + boxSize * 0.25, boxSize, boxSize * 0.75, 14);
        ctx.fill();

        // 礼盒盖子
        ctx.fillStyle = theme.accent;
        this.roundRect(ctx, bx - 10, by + boxSize * 0.15, boxSize + 20, boxSize * 0.22, 8);
        ctx.fill();

        // 礼盒飘带 (纵向与横向)
        ctx.fillStyle = theme.accentLight;
        ctx.fillRect(cx - 10, by + boxSize * 0.15, 20, boxSize * 0.85);

        // 礼盒蝴蝶结 (两个圆角花瓣与中心圆核)
        ctx.beginPath();
        ctx.ellipse(cx - 24, by + boxSize * 0.1, 22, 14, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx + 24, by + boxSize * 0.1, 22, 14, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx, by + boxSize * 0.1, 9, 0, Math.PI * 2);
        ctx.fill();

        // 核心文字铭牌
        ctx.fillStyle = theme.tagBg;
        const tagText = 'GIFT · 珍藏心意';
        ctx.font = 'bold 20px "Noto Sans SC", sans-serif';
        const tw = ctx.measureText(tagText).width + 30;
        this.roundRect(ctx, cx - tw / 2, cy + boxSize * 0.65, tw, 36, 18);
        ctx.fill();

        ctx.fillStyle = theme.tagColor;
        ctx.textAlign = 'center';
        ctx.fillText(tagText, cx, cy + boxSize * 0.65 + 25);

        ctx.restore();
    }

    /**
     * 绘制产品详情、排版与价格卡片 (Content Card)
     */
    static drawContentCard(ctx, w, h, variant, data, visualArea) {
        const theme = variant.theme;
        const isSquare = w === h;
        const cardX = w * 0.08;
        const cardW = w * 0.84;
        let cardY = visualArea.bottomY + (isSquare ? 15 : 28);
        const cardH = h * (isSquare ? 0.35 : 0.31);

        ctx.save();

        // 1. 磨砂质感卡片背景
        ctx.fillStyle = theme.cardBg;
        this.roundRect(ctx, cardX, cardY, cardW, cardH, 20);
        ctx.fill();

        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // 2. 促销标签 (如 "尊享特供" / "爆款热卖")
        let innerY = cardY + 45;
        const tagList = Array.isArray(data.tags) && data.tags.length > 0 ? data.tags : ['精选好礼', '品质推荐'];

        let tagOffsetX = cardX + 32;
        tagList.slice(0, 3).forEach(tag => {
            ctx.font = 'bold 20px "Noto Sans SC", sans-serif';
            const tWidth = ctx.measureText(tag).width + 24;
            ctx.fillStyle = variant.style === 'business' ? 'rgba(212, 175, 55, 0.16)' : 'rgba(234, 88, 12, 0.15)';
            this.roundRect(ctx, tagOffsetX, innerY - 22, tWidth, 32, 8);
            ctx.fill();

            ctx.strokeStyle = theme.borderColor;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = theme.accent;
            ctx.textAlign = 'left';
            ctx.fillText(tag, tagOffsetX + 12, innerY);
            tagOffsetX += tWidth + 14;
        });

        // 3. 礼品主标题 (Headline)
        innerY += 46;
        const title = data.name || '精选礼品定制专案';
        ctx.font = 'bold 44px "Noto Sans SC", "PingFang SC", sans-serif';
        ctx.fillStyle = theme.textPrimary;
        ctx.textAlign = 'left';

        // 标题超长自动缩小字号
        let titleSize = 44;
        while (ctx.measureText(title).width > cardW - 64 && titleSize > 30) {
            titleSize -= 2;
            ctx.font = `bold ${titleSize}px "Noto Sans SC", sans-serif`;
        }
        ctx.fillText(title, cardX + 32, innerY);

        // 4. 副标题 / 宣传标语
        innerY += 38;
        const slogan = data.slogan || data.subtitle || '臻选品质生活 · 传递温情心意';
        ctx.font = '500 24px "Noto Sans SC", sans-serif';
        ctx.fillStyle = theme.accentLight || theme.accent;
        ctx.fillText(slogan, cardX + 32, innerY);

        // 5. 详细描述 (Description) 自动换行
        innerY += 34;
        const desc = data.description || '精工甄造，典雅格调。为尊贵客户与珍视伙伴量身打造的非凡礼遇。';
        ctx.font = '400 22px "Noto Sans SC", sans-serif';
        ctx.fillStyle = theme.textSecondary;
        innerY = this.wrapText(ctx, desc, cardX + 32, innerY, cardW - 64, 32, 2);

        // 6. 价格与价值勋章 (Price & Call-To-Action)
        const price = data.price || '尊享特供';
        const priceY = cardY + cardH - 32;

        ctx.font = 'bold 40px "Noto Sans SC", sans-serif';
        ctx.fillStyle = theme.accent;
        ctx.fillText(price, cardX + 32, priceY);

        // 右侧 "立即选赠" / "定制咨询" 醒目标签
        const ctaText = data.ctaText || (variant.style === 'business' ? 'VIP 专享礼遇 ➔' : '立即选购心动礼 ➔');
        ctx.font = 'bold 22px "Noto Sans SC", sans-serif';
        const ctaW = ctx.measureText(ctaText).width + 36;
        const ctaX = cardX + cardW - ctaW - 28;
        const ctaY = priceY - 32;

        ctx.fillStyle = theme.tagBg;
        this.roundRect(ctx, ctaX, ctaY, ctaW, 42, 21);
        ctx.fill();

        ctx.fillStyle = theme.tagColor;
        ctx.textAlign = 'center';
        ctx.fillText(ctaText, ctaX + ctaW / 2, ctaY + 28);

        ctx.restore();
    }

    /**
     * 绘制底部声明与角标
     */
    static drawFooter(ctx, w, h, variant, data) {
        const theme = variant.theme;
        const footerY = Math.round(h * 0.965);

        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = '400 20px "Noto Sans SC", sans-serif';
        ctx.fillStyle = theme.textSecondary;
        const footerText = data.footerText || '官方正品保证 · 专属礼盒包装 · 全程冷链/极速达';
        ctx.fillText(footerText, w * 0.5, footerY);
        ctx.restore();
    }

    /**
     * 一键下载单张海报 Canvas 为 PNG
     */
    static downloadCanvas(canvas, filename = '礼品宣传图.png') {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png', 0.95);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// 导出全局
window.PosterEngine = PosterEngine;
window.POSTER_VARIANTS = POSTER_VARIANTS;
window.POSTER_ASPECT_RATIOS = POSTER_ASPECT_RATIOS;
