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
import BN from 'bignumber.js';
import SwapWarp from '../../Swap/SwapWarp';
import DepositWrap from '../../deposit/depositWrap/depositWrap';

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

    let swapToolPart;
    let depositToolPart;

    // 检查是否有 okx_swap_v1 与 cetus_deposit_v1 类型的工具调用
    content.forEach((p) => {
      if (p?.type === ContentTypes.TOOL_CALL) {
        const toolCall = p[ContentTypes.TOOL_CALL];
        if (toolCall && 'args' in toolCall) {
          try {
            const output = JSON.parse(toolCall.output ?? '{}');
            const outputAction = output?.data?.action;
            const outputActon = output?.data?.acton;

            if (outputAction === 'okx_swap_v1' || outputActon === 'okx_swap_v1') {
              swapToolPart = p;
            } else if (outputAction === 'cetus_deposit_v1' || outputActon === 'cetus_deposit_v1') {
              depositToolPart = p;
            }
          } catch (e) {
            // 解析错误，继续检查下一个
          }
        }
      }
    });

    const swapData =
      swapToolPart && swapToolPart.type === ContentTypes.TOOL_CALL
        ? JSON.parse(swapToolPart[ContentTypes.TOOL_CALL]?.output ?? '{}').data
        : null;
    const depositeData =
      depositToolPart && depositToolPart.type === ContentTypes.TOOL_CALL
        ? JSON.parse(depositToolPart[ContentTypes.TOOL_CALL]?.output ?? '{}').data
        : null;
    console.log('depositeData::', depositeData);

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

            // 如果是 okx_swap_v1 或 cetus_deposit_v1 类型的工具调用，则不渲染
            if (part?.type === ContentTypes.TOOL_CALL) {
              const toolCall = part[ContentTypes.TOOL_CALL];
              if (toolCall && 'args' in toolCall) {
                try {
                  const output = JSON.parse(toolCall.output ?? '{}');
                  const outputAction = output?.data?.action;
                  const outputActon = output?.data?.acton;

                  const isHidden =
                    outputAction === 'okx_swap_v1' ||
                    outputActon === 'okx_swap_v1' ||
                    outputAction === 'cetus_deposit_v1' ||
                    outputActon === 'cetus_deposit_v1';

                  if (isHidden) {
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
        {depositeData && <DepositWrap data={depositeData} />}
      </>
    );
  },
);

export default ContentParts;
