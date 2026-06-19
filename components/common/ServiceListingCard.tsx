import Link from "next/link";
import type { ProviderService } from "@/lib/types";

interface Props {
  service: ProviderService;
  providerName: string;
  providerId: string;
  variant?: "default" | "compact";
}

export default function ServiceListingCard({ service, providerName, providerId, variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <div className="border border-border bg-white hover:border-ai/30 hover:shadow-sm transition-all duration-300 p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-xs text-sumi/40 mb-0.5">{providerName}</p>
            <h3 className="text-sm text-sumi font-medium" style={{ fontFamily: "var(--font-serif)" }}>
              {service.title}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-base font-medium text-do">{service.priceLabel}</p>
          </div>
        </div>
        {service.subtitle && (
          <p className="text-xs text-sumi/60 mb-3">{service.subtitle}</p>
        )}
        <Link
          href={`/providers/${providerId}?tab=services`}
          className="text-xs text-ai border border-ai/30 px-3 py-1.5 hover:bg-ai hover:text-white transition-all duration-300 inline-block"
        >
          このサービスを見る
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-border bg-white">
      {/* ヘッダー */}
      <div className="border-b border-kiji px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
              {service.title}
            </h3>
            {service.subtitle && (
              <p className="text-xs text-sumi/60">{service.subtitle}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-medium text-do">{service.priceLabel}</p>
            {service.workingTimeHours && (
              <p className="text-xs text-sumi/40 mt-0.5">所要時間 {service.workingTimeHours}時間〜</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* キャッチコピー */}
        {service.catchCopy && (
          <p className="text-sm text-sumi/80 leading-relaxed bg-kiji/40 border-l-2 border-kincya px-4 py-3">
            {service.catchCopy}
          </p>
        )}

        {/* 説明 */}
        <p className="text-sm text-sumi/70 leading-relaxed">{service.description}</p>

        {/* 料金表 */}
        {service.priceTable && service.priceTable.length > 0 && (
          <div>
            <h4 className="text-sm text-sumi font-medium mb-2" style={{ fontFamily: "var(--font-serif)" }}>料金表</h4>
            <div className="border border-border overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {service.priceTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-kiji/20"}>
                      <td className="px-4 py-2.5 text-sumi/80">{row.label}</td>
                      <td className="px-4 py-2.5 font-medium text-sumi text-right whitespace-nowrap">{row.price}</td>
                      {row.note && (
                        <td className="px-4 py-2.5 text-xs text-sumi/50">{row.note}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* オプション料金 */}
        {service.optionPrices && service.optionPrices.length > 0 && (
          <div>
            <h4 className="text-sm text-sumi font-medium mb-2" style={{ fontFamily: "var(--font-serif)" }}>オプション料金</h4>
            <div className="space-y-1">
              {service.optionPrices.map((opt, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-kiji py-2 last:border-0">
                  <span className="text-sumi/70">{opt.label}</span>
                  <span className="font-medium text-sumi">{opt.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 施工の流れ */}
        {service.workFlow && service.workFlow.length > 0 && (
          <div>
            <h4 className="text-sm text-sumi font-medium mb-3" style={{ fontFamily: "var(--font-serif)" }}>施工の流れ</h4>
            <div className="space-y-2">
              {service.workFlow.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-sumi text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-sumi/70 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 対応エリア・営業日 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-kiji/30 p-3">
            <p className="text-xs text-sumi/50 mb-1">対応エリア</p>
            <p className="text-xs text-sumi/80">{service.serviceAreas.join("・")}</p>
          </div>
          {(service.travelFee || service.parkingFee) && (
            <div className="bg-kiji/30 p-3">
              <p className="text-xs text-sumi/50 mb-1">出張費・駐車場</p>
              {service.travelFee && <p className="text-xs text-sumi/80">出張：{service.travelFee}</p>}
              {service.parkingFee && <p className="text-xs text-sumi/80">駐車：{service.parkingFee}</p>}
            </div>
          )}
        </div>

        {/* 注意事項 */}
        {service.customerNote && (
          <div className="bg-cloud border border-border p-4">
            <p className="text-xs text-sumi/50 mb-1 font-medium">ご依頼前にご確認ください</p>
            <p className="text-xs text-sumi/70 leading-relaxed">{service.customerNote}</p>
          </div>
        )}

        {/* 対応不可 */}
        {service.cannotHandle && service.cannotHandle.length > 0 && (
          <div>
            <p className="text-xs text-sumi/50 mb-2">このサービスでは対応できないケース</p>
            <ul className="space-y-1">
              {service.cannotHandle.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-sumi/60">
                  <span className="text-do shrink-0">✕</span>{item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* キャンセルポリシー */}
        {service.cancelPolicy && (
          <div className="border-t border-kiji pt-4">
            <p className="text-xs text-sumi/50">キャンセルポリシー：<span className="text-sumi/70">{service.cancelPolicy}</span></p>
          </div>
        )}

        {/* CTA */}
        <div className="flex gap-3 pt-2">
          <Link
            href={`/providers/${providerId}?tab=booking`}
            className="flex-1 text-center bg-kincya text-white text-sm py-3 hover:bg-do transition-colors tracking-wider"
          >
            予約リクエストを送る
          </Link>
          <Link
            href={`/providers/${providerId}?tab=quote`}
            className="flex-1 text-center border border-ai text-ai text-sm py-3 hover:bg-ai hover:text-white transition-all duration-300 tracking-wider"
          >
            見積もりを依頼
          </Link>
        </div>
      </div>
    </div>
  );
}
