"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/money";
import type { GunContent } from "@/lib/content/guns";
import type { StoreImage, StorePrices } from "@/lib/commerce";

interface Props {
  productId: number;
  name: string;
  eyebrow: string;
  shortHtml: string;
  prices: StorePrices;
  images: StoreImage[];
  gun: GunContent;
}

// Apple-style "Buy" configurator (white, purchase-focused). Options adjust
// the displayed price via priceDelta; the cart adds the base product in mock
// mode (real WooCommerce variations wire in behind the same UI later).
export default function Configurator({
  productId,
  name,
  eyebrow,
  shortHtml,
  prices,
  images,
  gun,
}: Props) {
  const { addItem, busy } = useCart();
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(gun.configurator.map((g) => [g.key, g.values[0].id])),
  );

  const base = Number(prices.price_range?.min_amount ?? prices.price);
  const total = useMemo(() => {
    let sum = base;
    for (const group of gun.configurator) {
      const val = group.values.find((v) => v.id === selected[group.key]);
      if (val?.priceDelta) sum += val.priceDelta;
    }
    return sum;
  }, [base, gun.configurator, selected]);

  const add = async () => {
    await addItem(productId, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="buy">
      <div className="buy-media">
        <div className="buy-stage">
          <Image
            src={images[active]?.src ?? images[0].src}
            alt={images[active]?.alt ?? name}
            width={680}
            height={680}
            priority
          />
        </div>
        {images.length > 1 && (
          <div className="buy-thumbs">
            {images.map((im, i) => (
              <button
                key={im.src}
                className={`buy-thumb${i === active ? " active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`View ${i + 1}`}
              >
                <Image src={im.src} alt="" width={56} height={56} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="buy-info">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{name}</h1>
        <div className="buy-short" dangerouslySetInnerHTML={{ __html: shortHtml }} />
        <p className="buy-price">
          {prices.price_range ? <span className="from">From </span> : null}
          {formatPrice(String(base), prices.currency_minor_unit, prices.currency_symbol)}
        </p>

        {gun.configurator.map((group) => {
          const chosen = group.values.find((v) => v.id === selected[group.key]);
          return (
            <div className="cfg-group" key={group.key}>
              <div className="cfg-head">
                <span className="cfg-label">{group.label}</span>
                <span className="cfg-chosen">{chosen?.label}</span>
              </div>
              <div className="cfg-options">
                {group.values.map((v) => (
                  <button
                    key={v.id}
                    className={`cfg-option${selected[group.key] === v.id ? " selected" : ""}`}
                    onClick={() => setSelected((s) => ({ ...s, [group.key]: v.id }))}
                  >
                    {v.swatch && <span className="cfg-swatch" style={{ background: v.swatch }} />}
                    <span>
                      <span className="opt-main">{v.label}</span>
                      {v.sublabel && <span className="opt-sub">{v.sublabel}</span>}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <div className="buy-summary">
          <div className="row total">
            <span>Your {name.split(" ").slice(-1)[0]}</span>
            <span>{formatPrice(String(total), prices.currency_minor_unit, prices.currency_symbol)}</span>
          </div>
          <div className="buy-actions">
            <button className="btn btn-primary btn-lg" disabled={busy} onClick={add}>
              {added ? "Added ✓" : "Add to Bag"}
            </button>
          </div>
          <p className="buy-note">
            Ships to a licensed FFL dealer. You must be 21+ to purchase a firearm. Final price,
            tax, and transfer are confirmed at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
