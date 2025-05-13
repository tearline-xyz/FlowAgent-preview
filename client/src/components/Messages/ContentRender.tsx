import { useRecoilValue } from 'recoil';
import { useCallback, useMemo, memo } from 'react';
import type { TMessage, TMessageContentParts } from 'librechat-data-provider';
import type { TMessageProps, TMessageIcon } from '~/common';
import ContentParts from '~/components/Chat/Messages/Content/ContentParts';
import PlaceholderRow from '~/components/Chat/Messages/ui/PlaceholderRow';
import SiblingSwitch from '~/components/Chat/Messages/SiblingSwitch';
import HoverButtons from '~/components/Chat/Messages/HoverButtons';
import MessageIcon from '~/components/Chat/Messages/MessageIcon';
import SubRow from '~/components/Chat/Messages/SubRow';
import { useMessageActions } from '~/hooks';
import { cn, logger } from '~/utils';
import store from '~/store';

type ContentRenderProps = {
  message?: TMessage;
  isCard?: boolean;
  isMultiMessage?: boolean;
  isSubmittingFamily?: boolean;
} & Pick<
  TMessageProps,
  'currentEditId' | 'setCurrentEditId' | 'siblingIdx' | 'setSiblingIdx' | 'siblingCount'
>;

const ContentRender = memo(
  ({
    message: msg,
    isCard = false,
    siblingIdx,
    siblingCount,
    setSiblingIdx,
    currentEditId,
    isMultiMessage = false,
    setCurrentEditId,
    isSubmittingFamily = false,
  }: ContentRenderProps) => {
    const {
      edit,
      index,
      agent,
      assistant,
      enterEdit,
      conversation,
      messageLabel,
      isSubmitting,
      latestMessage,
      handleContinue,
      copyToClipboard,
      setLatestMessage,
      regenerateMessage,
    } = useMessageActions({
      message: msg,
      currentEditId,
      isMultiMessage,
      setCurrentEditId,
    });

    const maximizeChatSpace = useRecoilValue(store.maximizeChatSpace);
    const fontSize = useRecoilValue(store.fontSize);

    const handleRegenerateMessage = useCallback(() => regenerateMessage(), [regenerateMessage]);
    const isLast = useMemo(
      () =>
        !(msg?.children?.length ?? 0) && (msg?.depth === latestMessage?.depth || msg?.depth === -1),
      [msg?.children, msg?.depth, latestMessage?.depth],
    );
    const isLatestMessage = msg?.messageId === latestMessage?.messageId;
    const showCardRender = isLast && !isSubmittingFamily && isCard;
    const isLatestCard = isCard && !isSubmittingFamily && isLatestMessage;

    const iconData: TMessageIcon = useMemo(
      () => ({
        endpoint: msg?.endpoint ?? conversation?.endpoint,
        model: msg?.model ?? conversation?.model,
        iconURL: msg?.iconURL,
        modelLabel: messageLabel,
        isCreatedByUser: msg?.isCreatedByUser,
      }),
      [
        messageLabel,
        conversation?.endpoint,
        conversation?.model,
        msg?.model,
        msg?.iconURL,
        msg?.endpoint,
        msg?.isCreatedByUser,
      ],
    );

    const clickHandler = useMemo(
      () =>
        showCardRender && !isLatestMessage
          ? () => {
              logger.log(`Message Card click: Setting ${msg?.messageId} as latest message`);
              logger.dir(msg);
              setLatestMessage(msg!);
            }
          : undefined,
      [showCardRender, isLatestMessage, msg, setLatestMessage],
    );

    if (!msg) {
      return null;
    }

    const baseClasses = {
      common: 'group mx-auto flex flex-1 gap-3 transition-all duration-300 transform-gpu ',
      card: 'relative w-full gap-1 rounded-lg border border-border-medium bg-surface-primary-alt p-2 md:w-1/2 md:gap-3 md:p-4',
      chat: maximizeChatSpace
        ? 'w-full max-w-full md:px-5 lg:px-1 xl:px-5'
        : 'md:max-w-[47rem] xl:max-w-[55rem]',
    };

    const conditionalClasses = {
      latestCard: isLatestCard ? 'bg-surface-secondary' : '',
      cardRender: showCardRender ? 'cursor-pointer transition-colors duration-300' : '',
      focus: 'focus:outline-none focus:ring-2 focus:ring-border-xheavy',
    };

    return (
      <div
        data-id={'ContentRenderBox111'}
        id={msg.messageId}
        aria-label={`message-${msg.depth}-${msg.messageId}`}
        className={cn(
          baseClasses.common,
          isCard ? baseClasses.card : baseClasses.chat,
          conditionalClasses.latestCard,
          conditionalClasses.cardRender,
          conditionalClasses.focus,
          'message-render',
        )}
        onClick={clickHandler}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && clickHandler) {
            clickHandler();
          }
        }}
        role={showCardRender ? 'button' : undefined}
        tabIndex={showCardRender ? 0 : undefined}
      >
        {isLatestCard && (
          <div
            id={'absoluteBoxxx'}
            className="absolute right-0 top-0 m-2 h-3 w-3 rounded-full bg-text-primary"
          />
        )}

        <div id={'relativeBoxxxx'} className="relative flex flex-shrink-0 flex-col items-center">
          <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
            <MessageIcon iconData={iconData} assistant={assistant} agent={agent} />
          </div>
        </div>

        <div
          className={cn(
            'relative flex w-11/12 flex-col',
            msg.isCreatedByUser ? 'user-turn' : 'agent-turn',
          )}
          id={'relativeflexw-11/12'}
        >
          <h2 className={cn('select-none font-semibold', fontSize)}>{messageLabel}</h2>

          <div className="flex flex-col gap-1">
            <div
              id={'flex_max-w-full_flex-grow_flex-col_gap-0'}
              className="flex max-w-full flex-grow flex-col gap-0"
            >
              <ContentParts
                edit={edit}
                isLast={isLast}
                enterEdit={enterEdit}
                siblingIdx={siblingIdx}
                messageId={msg.messageId}
                isSubmitting={isSubmitting}
                setSiblingIdx={setSiblingIdx}
                attachments={msg.attachments}
                isCreatedByUser={msg.isCreatedByUser}
                conversationId={conversation?.conversationId}
                content={msg.content as Array<TMessageContentParts | undefined>}
                //                 content={[
                //                   {
                //                     type: 'text',
                //                     text: '',
                //                     tool_call_ids: ['call_jRzVcHcFrp7BqsDGqRRw64EK'],
                //                   },
                //                   {
                //                     type: 'tool_call',
                //                     tool_call: {
                //                       id: 'call_jRzVcHcFrp7BqsDGqRRw64EK',
                //                       name: 'search_tools_mcp_everything',
                //                       args: '{"query":"bnb current price exchange rate"}',
                //                       type: 'tool_call',
                //                       progress: 1,
                //                       output: `{
                //   "msg": "deposit transaction has been generated. Remind the use to adjust the parameters and sign the transaction on the interactive window below the chat box",
                //   "data": {
                //     "action": "cetus_deposit_v1",
                //     "data": {
                //       "pool_address": "0xb8d7d9e66a60c239e7a60110efcf8de6c705580ed924d0dde141f4a0e2c90105",
                //       "amount_a": 1000,
                //       "amount_b": 0,
                //       "tick_upper": 83069,
                //       "tick_lower": 82692
                //     }
                //   }
                // }`,
                //                     },
                //                   },
                //                   {
                //                     type: 'text',
                //                     text: '',
                //                     tool_call_ids: ['call_FMppNmgDmERBPIiCe5uTlusI'],
                //                   },
                //                   {
                //                     type: 'tool_call',
                //                     tool_call: {
                //                       id: 'call_FMppNmgDmERBPIiCe5uTlusI',
                //                       name: 'invoke_tool_mcp_everything',
                //                       args: '{"tool_name":"get_token_price_latest","tool_kw_args":{"symbol":"bnb"}}',
                //                       type: 'tool_call',
                //                       progress: 1,
                //                       output:
                //                         '{"symbol": "BNB", "price": 604.3974743523231, "volume_24h": 1559103077.0885866, "percent_change_7d": 0.48774501, "volume_change_24h": 2.5365}',
                //                     },
                //                   },
                //                   {
                //                     type: 'text',
                //                     text: '',
                //                     tool_call_ids: ['call_sc4EHlCsHjlTSkfDuVicKbtY'],
                //                   },
                //                   {
                //                     type: 'tool_call',
                //                     tool_call: {
                //                       id: 'call_sc4EHlCsHjlTSkfDuVicKbtY',
                //                       name: 'invoke_tool_mcp_everything',
                //                       args: '{"tool_name":"token_swap","tool_kw_args":{"from_token":"USD","to_token":"BNB","amount":1000}}',
                //                       type: 'tool_call',
                //                       progress: 1,
                //                       output:
                //                         '{"msg": "The transaction has been generated, need to check and sign it. Remind the user to click on the interactive window below the chat box to complete the transaction", "data": {"acton": "okx_swap_v1", "data": [{"from_coin": "0x55d398326f99059ff775485246999027b3197955", "from_decimal": 18, "from_symbol": "USDT", "to_coin": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", "to_decimal": 18, "to_symbol": "BNB", "from_amount": "1000.0", "to_amount": "0", "chain_name": "BNB Chain", "chain_id": 56}, {"from_coin": "0xdac17f958d2ee523a2206206994597c13d831ec7", "from_decimal": 6, "from_symbol": "USDT", "to_coin": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", "to_decimal": 18, "to_symbol": "BNB", "from_amount": "1000.0", "to_amount": "0", "chain_name": "Ethereum", "chain_id": 1}]}}',
                //                     },
                //                   },
                //                   {
                //                     type: 'text',
                //                     text: '当前BNB（币安币）的价格是604.40 USD。使用1000 USD兑换BNB的交易已生成，您需要点击聊天框下方的互动窗口以完成交易。\n\n您将能够在以下两条链上执行交换：\n1. BNB Chain\n2. Ethereum\n\n请确保查看并签署交易。',
                //                   },
                //                 ]}
              />
            </div>

            {(isSubmittingFamily || isSubmitting) && !(msg.children?.length ?? 0) ? (
              <PlaceholderRow isCard={isCard} />
            ) : (
              <SubRow classes="text-xs">
                <SiblingSwitch
                  siblingIdx={siblingIdx}
                  siblingCount={siblingCount}
                  setSiblingIdx={setSiblingIdx}
                />
                <HoverButtons
                  index={index}
                  isEditing={edit}
                  message={msg}
                  enterEdit={enterEdit}
                  isSubmitting={isSubmitting}
                  conversation={conversation ?? null}
                  regenerate={handleRegenerateMessage}
                  copyToClipboard={copyToClipboard}
                  handleContinue={handleContinue}
                  latestMessage={latestMessage}
                  isLast={isLast}
                />
              </SubRow>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default ContentRender;
