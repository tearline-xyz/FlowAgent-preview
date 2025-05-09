import { memo, useMemo, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { ContentTypes } from 'librechat-data-provider';
import type { TMessageContentParts, TAttachment, Agents } from 'librechat-data-provider';
import { ThinkingButton } from '~/components/Artifacts/Thinking';
import EditTextPart from './Parts/EditTextPart';
import useLocalize from '~/hooks/useLocalize';
import { mapAttachments } from '~/utils/map';
import { MessageContext } from '~/Providers';
import store from '~/store';
import Part from './Part';
import SwapWarp from '../../Swap/SwapWarp';

type ContentPartsProps = {
  content: Array<TMessageContentParts | undefined> | undefined;
  messageId: string;
  conversationId?: string | null;
  attachments?: TAttachment[];
  isCreatedByUser: boolean;
  isLast: boolean;
  isSubmitting: boolean;
  edit?: boolean;
  enterEdit?: (cancel?: boolean) => void | null | undefined;
  siblingIdx?: number;
  setSiblingIdx?:
    | ((value: number) => void | React.Dispatch<React.SetStateAction<number>>)
    | null
    | undefined;
};

const ContentParts = memo(
  ({
    content,
    messageId,
    conversationId,
    attachments,
    isCreatedByUser,
    isLast,
    isSubmitting,
    edit,
    enterEdit,
    siblingIdx,
    setSiblingIdx,
  }: ContentPartsProps) => {
    const localize = useLocalize();
    const [showThinking, setShowThinking] = useRecoilState<boolean>(store.showThinking);
    const [isExpanded, setIsExpanded] = useState(showThinking);
    const messageAttachmentsMap = useRecoilValue(store.messageAttachmentsMap);
    const attachmentMap = useMemo(
      () => mapAttachments(attachments ?? messageAttachmentsMap[messageId] ?? []),
      [attachments, messageAttachmentsMap, messageId],
    );
    console.log('contentcontent::', content);
    const hasReasoningParts = useMemo(() => {
      const hasThinkPart = content?.some((part) => part?.type === ContentTypes.THINK) ?? false;
      const allThinkPartsHaveContent =
        content?.every((part) => {
          if (part?.type !== ContentTypes.THINK) {
            return true;
          }

          if (typeof part.think === 'string') {
            const cleanedContent = part.think.replace(/<\/?think>/g, '').trim();
            return cleanedContent.length > 0;
          }

          return false;
        }) ?? false;

      return hasThinkPart && allThinkPartsHaveContent;
    }, [content]);
    if (!content) {
      return null;
    }

    // 检查是否有 okx_swap_v1 类型的工具调用
    const swapToolPart = content.find((p) => {
      if (p?.type === ContentTypes.TOOL_CALL) {
        const toolCall = p[ContentTypes.TOOL_CALL];
        if (toolCall && 'args' in toolCall) {
          try {
            const output = JSON.parse(toolCall.output ?? '{}');
            return output?.data?.acton === 'okx_swap_v1';
          } catch (e) {
            return false;
          }
        }
      }
      return false;
    });

    const swapData =
      swapToolPart && swapToolPart.type === ContentTypes.TOOL_CALL
        ? JSON.parse(swapToolPart[ContentTypes.TOOL_CALL]?.output ?? '{}').data
        : null;
    if (edit === true && enterEdit && setSiblingIdx) {
      return (
        <>
          {content.map((part, idx) => {
            if (part?.type !== ContentTypes.TEXT || typeof part.text !== 'string') {
              return null;
            }

            return (
              <EditTextPart
                index={idx}
                text={part.text}
                messageId={messageId}
                isSubmitting={isSubmitting}
                enterEdit={enterEdit}
                siblingIdx={siblingIdx ?? null}
                setSiblingIdx={setSiblingIdx}
                key={`edit-${messageId}-${idx}`}
              />
            );
          })}
        </>
      );
    }

    return (
      <>
        {hasReasoningParts && (
          <div id={'mb-5Box11111'} className="mb-5">
            <ThinkingButton
              isExpanded={isExpanded}
              onClick={() =>
                setIsExpanded((prev) => {
                  const val = !prev;
                  setShowThinking(val);
                  return val;
                })
              }
              label={
                isSubmitting && isLast ? localize('com_ui_thinking') : localize('com_ui_thoughts')
              }
            />
          </div>
        )}
        {content
          .filter((part) => part)
          .map((part, idx) => {
            const toolCallId =
              (part?.[ContentTypes.TOOL_CALL] as Agents.ToolCall | undefined)?.id ?? '';
            const attachments = attachmentMap[toolCallId];

            // 如果是 okx_swap_v1 类型的工具调用，则不渲染
            if (part?.type === ContentTypes.TOOL_CALL) {
              const toolCall = part[ContentTypes.TOOL_CALL];
              if (toolCall && 'args' in toolCall) {
                try {
                  const output = JSON.parse(toolCall.output ?? '{}');
                  if (output?.data?.acton === 'okx_swap_v1') {
                    return null;
                  }
                } catch (e) {
                  // 解析错误，继续正常渲染
                }
              }
            }

            return (
              <MessageContext.Provider
                key={`provider-${messageId}-${idx}`}
                value={{
                  messageId,
                  conversationId,
                  partIndex: idx,
                  isExpanded,
                  nextType: content[idx + 1]?.type,
                }}
              >
                <Part
                  part={part}
                  attachments={attachments}
                  isSubmitting={isSubmitting}
                  key={`part-${messageId}-${idx}`}
                  isCreatedByUser={isCreatedByUser}
                  isLast={idx === content.length - 1}
                  showCursor={idx === content.length - 1 && isLast}
                />
              </MessageContext.Provider>
            );
          })}
        {swapData && <SwapWarp data={swapData} />}
      </>
    );
  },
);

export default ContentParts;
