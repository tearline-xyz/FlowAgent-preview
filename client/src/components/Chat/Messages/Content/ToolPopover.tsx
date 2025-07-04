import * as Popover from '@radix-ui/react-popover';
import useLocalize from '~/hooks/useLocalize';
import { useEffect } from 'react';
import mermaid from 'mermaid';

export default function ToolPopover({
                                      input,
                                      output,
                                      domain,
                                      function_name,
                                      pendingAuth,
                                    }: {
  input: string;
  function_name: string;
  output?: string | null;
  domain?: string;
  pendingAuth?: boolean;
}) {
  console.log('input', input);
  const localize = useLocalize();
  let mermaid_description = '';


  if (input && typeof input === 'string' && input.includes('graph')) {
    try {
      let jsonArgs = JSON.parse(input);
      if(jsonArgs.hasOwnProperty('mermaid_description') && jsonArgs.hasOwnProperty('start_state')){

        let c = `
  classDef highlight fill:#FFF9C4,stroke:#FFC107,stroke-width:3px;
        class ${jsonArgs.start_state||'C'} highlight`;
        mermaid_description = jsonArgs.mermaid_description + c;
      }
    }catch (e) {
      mermaid_description=''
    }

  }
  console.log('mermaid_description', mermaid_description);
  const MermaidChart = ({ chart }) => {
    useEffect(() => {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }, []);

    return <div className='mermaid'>{chart}</div>;
  };
  const formatText = (text: string) => {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      return text;
    }
  };

  let title =
    domain != null && domain
      ? localize('com_assistants_domain_info', { 0: domain })
      : localize('com_assistants_function_use', { 0: function_name });
  if (pendingAuth === true) {
    title =
      domain != null && domain
        ? localize('com_assistants_action_attempt', { 0: domain })
        : localize('com_assistants_attempt_info');
  }

  return (
    <Popover.Portal>
      <Popover.Content
        side='bottom'
        align='start'
        sideOffset={12}
        alignOffset={-5}
        className='w-18 min-w-[180px]  max-w-lg rounded-lg bg-surface-primary px-1'
      >
        <div tabIndex={-1}>
          <div
            className='bg-token-surface-primary max-w-sm rounded-md p-2 shadow-[0_0_24px_0_rgba(0,0,0,0.05),inset_0_0.5px_0_0_rgba(0,0,0,0.05),0_2px_8px_0_rgba(0,0,0,0.05)]'>
            <div className='mb-2 text-sm font-medium text-text-primary'>{title}</div>
            <div className='bg-token-surface-secondary text-token-text-primary dark rounded-md text-xs'>
              <div className='max-h-32 overflow-y-auto rounded-md bg-surface-tertiary p-2'>
                <code className='!whitespace-pre-wrap '>
                  {
                    mermaid_description ? <MermaidChart chart={mermaid_description} />:formatText(input)
                  }
                </code>
              </div>
            </div>
            {output != null && output && (
              <>
                <div className='mb-2 mt-2 text-sm font-medium text-text-primary'>
                  {localize('com_ui_result')}
                </div>
                <div className='bg-token-surface-secondary text-token-text-primary dark rounded-md text-xs'>
                  <div className='max-h-32 overflow-y-auto rounded-md bg-surface-tertiary p-2'>
                    <code className='!whitespace-pre-wrap '>{formatText(output)}</code>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Popover.Content>
    </Popover.Portal>
  );
}
