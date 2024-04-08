// icon:credit-card | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import * as React from "react";

function PaymentSvg({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M928 160H96c-17.7 0-32 14.3-32 32v160h896V192c0-17.7-14.3-32-32-32zM64 832c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V440H64v392zm579-184c0-4.4 3.6-8 8-8h165c4.4 0 8 3.6 8 8v72c0 4.4-3.6 8-8 8H651c-4.4 0-8-3.6-8-8v-72z" />
    </svg>
  );
}

export default PaymentSvg;
