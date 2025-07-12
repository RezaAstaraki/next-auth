'use client'
import { ClientLogger as ClientLoggerClient } from "react-a2z";

type Props = {
  data: any;
  label?: string;
  showDataInUi?: boolean;
  showDataConsole?: boolean;
  indent?: number;
};

export default function Clo({
  data,
  label,
  showDataInUi,
  showDataConsole,
  indent,
}: Props) {
  return (
    <ClientLoggerClient
      data={data}
      label={label}
      showDataInUi={showDataInUi}
      showDataConsole={showDataConsole}
      indent={indent}
    />
  );
}
