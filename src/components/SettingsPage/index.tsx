import { FC } from "react";
import useSettings from "../../hooks/useSettings";

const SettingsPage: FC<{ className: string }> = ({ className = '' }) => {
  const settings = useSettings();

  return (
    <div className={className}>
      <div className='max-w-lg mx-auto'>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </div>
  );
}

export default SettingsPage;