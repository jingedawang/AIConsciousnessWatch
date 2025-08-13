// Umami Analytics 集成工具
declare global {
    interface Window {
        umami?: {
            track: (event: string, data?: Record<string, any>) => void;
        };
    }
}

class UmamiAnalytics {
    // 追踪自定义事件
    trackEvent(eventName: string, eventData?: Record<string, any>) {
        if (typeof window !== 'undefined' && window.umami) {
            window.umami.track(eventName, eventData);
        }
    }

    // 追踪语言切换
    trackLanguageToggle(fromLang: string, toLang: string) {
        this.trackEvent('language-toggle', {
            from: fromLang,
            to: toLang
        });
    }

    // 追踪论文链接点击
    trackPaperClick(paperTitle: string, paperUrl: string, metricId?: string, levelTitle?: string) {
        this.trackEvent('paper-click', {
            title: paperTitle,
            url: paperUrl,
            metric_id: metricId,
            level: levelTitle
        });

        // 同时发送带具体论文标识的事件，用于统计单篇论文的点击量
        this.trackEvent(`paper-click-${paperTitle.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`, {
            title: paperTitle,
            url: paperUrl,
            metric_id: metricId,
            level: levelTitle
        });
    }

    // 追踪 metric 点击事件
    trackMetricClick(metricId: string, metricName: string, levelTitle: string) {
        this.trackEvent('metric-click', {
            metric_id: metricId,
            metric_name: metricName,
            level: levelTitle
        });

        // 同时发送带具体 metric 标识的事件，用于统计单个 metric 的点击量
        this.trackEvent(`metric-click-${metricId}`, {
            metric_id: metricId,
            metric_name: metricName,
            level: levelTitle
        });
    }

    // 追踪报告链接点击
    trackReportClick(reportType: 'chinese' | 'english' | 'inline-chinese' | 'inline-english') {
        this.trackEvent('report-click', {
            type: reportType
        });
    }

    // 追踪外部链接点击
    trackExternalLink(linkType: 'github' | 'linkedin', url: string) {
        this.trackEvent('external-link-click', {
            type: linkType,
            url: url
        });
    }

    // 追踪页面停留时间
    trackTimeOnPage(seconds: number) {
        this.trackEvent('time-on-page', {
            duration: seconds
        });
    }
}

export const umami = new UmamiAnalytics();
