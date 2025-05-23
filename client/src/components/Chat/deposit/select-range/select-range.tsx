import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './select-range.module.css';
import { initCetusSDK, Pool, TickMath } from '@cetusprotocol/cetus-sui-clmm-sdk';

/*
See:
https://github.com/hustcc/echarts-for-react/issues/179
https://echarts.apache.org/examples/en/editor.html?c=candlestick-brush&lang=ts
https://apache.github.io/echarts-handbook/en/concepts/event/

Options:
https://echarts.apache.org/en/option.html
*/

interface TickObj {
  tickIndex: number;
  liquidity: number;
  price: number;
}

function findClosestTickIndex(liquidityDist, targetTickIndex) {
  return liquidityDist.reduce((closest, current, index) => {
    const currentDiff = Math.abs(current.tickIndex - targetTickIndex);
    const closestDiff = Math.abs(liquidityDist[closest].tickIndex - targetTickIndex);
    return currentDiff < closestDiff ? index : closest;
  }, 0);
}

async function fetchTicks(poolAddress) {
  const url = `https://api-sui.cetus.zone/router_v2/ticks?address=${poolAddress}&orderBy=index&limit=1000`;
  const resp = await fetch(url);
  const json = await resp.json();
  console.log('json', json);

  return json.data?.list || [];
}

async function fetchPool(poolAddress) {
  const resp = await fetch('https://api-sui.cetus.zone/v3/sui/clmm/stats_pools', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: 'all',
      sortBy: 'vol',
      sortOrder: 'asc',
      limit: 20,
      offset: 0,
      coinTypes: [],
      pools: [poolAddress],
    }),
  });
  const json = await resp.json();
  return json.data.list[0];
}

async function loadPoolAndTicks(poolAddress, setLiquidityDist, setPool) {
  const ticks = await fetchTicks(poolAddress);
  console.log('ticks', ticks);

  const pool = await fetchPool(poolAddress);
  console.log('pool', pool);
  setPool(pool);

  // 累加liquidity_net
  let accLiquidity = 0;
  const dist: TickObj[] = [];
  for (const tick of ticks) {
    accLiquidity += tick.liquidity_net;
    // 跳过accLiquidity为负数的case
    if (accLiquidity < 0) {
      continue;
    }
    const price = TickMath.tickIndexToPrice(tick.index, pool.coinA.decimals, pool.coinB.decimals);
    dist.push({
      tickIndex: tick.index,
      liquidity: accLiquidity,
      price: 1 / price.toNumber(),
    });
  }

  // 按price排序
  dist.sort((a, b) => a.price - b.price);
  console.log('liquidityDist', dist);
  setLiquidityDist(dist);
}

function formatPriceLabel(price, liquidityDist) {
  if (
    Array.isArray(liquidityDist) &&
    liquidityDist.length > 0 &&
    price === Math.max(...liquidityDist.map((d) => d.price))
  ) {
    return '∞';
  }
  return price.toFixed(6);
}
interface SelectRangeProps {
  lowerTick: number;
  upperTick: number;
  poolAddress: string;
  setLowerTick: (tick: number) => void;
  setUpperTcik: (tick: number) => void;
  onRangeChanged?: (lowerTick: number, upperTick: number) => void;
}

export default function SelectRange({
  lowerTick,
  upperTick,
  poolAddress,
  setLowerTick,
  setUpperTcik,
  onRangeChanged,
}: SelectRangeProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const echartsRef = useRef<ReactECharts>(null);
  console.log('start lowerTic', lowerTick);
  console.log('poolAddress', poolAddress);

  console.log('start upperTick', upperTick);
  const [pool, setPool] = useState<any>(null);
  const [liquidityDist, setLiquidityDist] = useState<TickObj[]>([] as TickObj[]);
  const [isFetchingDist, setIsFetchingDist] = useState(false);
  const [lowerPrice, setLowerPrice] = useState(0);
  const [upperPrice, setUpperPrice] = useState(0);

  // 用 useMemo 生成 option，只依赖 liquidityDist
  const option = useMemo(() => {
    return {
      tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000',
        },
      },
      toolbox: {
        feature: {
          brush: {
            type: ['lineX', 'clear'],
          },
        },
      },
      brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
          colorAlpha: 0.5,
        },
        brushStyle: {
          borderWidth: 3,
        },
      },
      visualMap: {
        show: false,
        seriesIndex: 0,
        dimension: 0,
        pieces: [
          {
            gt: 0,
            color: '#3B82F6',
          },
        ],
      },
      xAxis: {
        inverse: false,
        type: 'category',
        data: liquidityDist.map((d) => d.price),
        name: 'Price',
        nameTextStyle: {
          color: '#fff',
          fontWeight: 'bold',
        },
        axisLabel: {
          show: true,
          interval: 50,
          showMaxLabel: false,
          showMinLabel: true,
          formatter: function (value) {
            return Number(value).toFixed(2);
          },
        },
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 3,
          },
        },
        axisPointer: {
          show: false,
          label: {
            formatter: function (params) {
              return Number(params.value).toFixed(6);
            },
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'Liquidity',
        nameTextStyle: {
          color: '#fff',
          fontWeight: 'bold',
        },
        axisLabel: { show: false },
        splitLine: { show: false },
        axisLine: {
          show: true,
          lineStyle: {
            width: 3,
          },
        },
        axisTick: { show: false },
        axisPointer: {
          show: false,
        },
      },
      series: [
        {
          type: 'bar',
          data: liquidityDist.map((d) => d.liquidity),
          barWidth: '100%',
        },
      ],
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: 0,
          start: 0,
          end: 100,
          realtime: true,
          height: 40,
          handleStyle: {
            color: '#22c55e',
            borderColor: '#22c55e',
          },
          backgroundColor: '#23262F',
          fillerColor: 'rgba(59,130,246,0.18)',
          borderColor: '#23262F',
        },
      ],
    };
  }, [liquidityDist, lowerTick, upperTick]);

  const priceHandlers = {
    lower_price_increment: () => {
      const nextPricePoint = liquidityDist.find(
        (d) => d.price > lowerPrice && d.price < upperPrice,
      );
      if (nextPricePoint) {
        const startIndex = liquidityDist.findIndex((d) => d.price === nextPricePoint.price);
        setLowerPrice(nextPricePoint.price);
        updateBrushArea(startIndex, undefined);
      }
    },
    lower_price_decrement: () => {
      const prevPricePoint = [...liquidityDist]
        .reverse()
        .find((d) => d.price < lowerPrice && d.price > 0);
      if (prevPricePoint) {
        const startIndex = liquidityDist.findIndex((d) => d.price === prevPricePoint.price);
        setLowerPrice(prevPricePoint.price);
        updateBrushArea(startIndex, undefined);
      }
    },
    upper_price_increment: () => {
      const nextPricePoint = liquidityDist.find((d) => d.price > upperPrice);
      if (nextPricePoint) {
        const endIndex = liquidityDist.findIndex((d) => d.price === nextPricePoint.price);
        setUpperPrice(nextPricePoint.price);
        updateBrushArea(undefined, endIndex);
      }
    },
    upper_price_decrement: () => {
      const prevPricePoint = [...liquidityDist]
        .reverse()
        .find((d) => d.price < upperPrice && d.price > lowerPrice);
      if (prevPricePoint) {
        const endIndex = liquidityDist.findIndex((d) => d.price === prevPricePoint.price);
        setUpperPrice(prevPricePoint.price);
        updateBrushArea(undefined, endIndex);
      }
    },
  };

  const updateBrushArea = (startIndex, endIndex) => {
    if (echartsRef.current) {
      const echartsInstance = echartsRef.current.getEchartsInstance();
      const brushComponent = (echartsInstance as any).getModel().getComponent('brush');
      const currentRange = brushComponent.areas[0].coordRange;

      const newRange = [
        startIndex !== null && startIndex !== undefined ? startIndex : currentRange[0],
        endIndex !== null && endIndex !== undefined ? endIndex : currentRange[1],
      ];
      echartsInstance.dispatchAction({
        type: 'brush',
        areas: [
          {
            brushType: 'lineX',
            coordRange: newRange,
            xAxisIndex: 0,
          },
        ],
      });
    }
  };
  const initLiquidityData = async () => {
    if (poolAddress) {
      setIsFetchingDist(true);
      await loadPoolAndTicks(poolAddress, setLiquidityDist, setPool);
      setIsFetchingDist(false);
    }
  };

  useEffect(() => {
    initLiquidityData();
  }, [poolAddress]);

  // 只在 liquidityDist 变化时初始化 brush/dataZoom，不在 brush/dataZoom 事件里 setState 影响 option
  useEffect(() => {
    if (echartsRef.current && liquidityDist.length > 0) {
      const echartsInstance = echartsRef.current.getEchartsInstance();

      echartsInstance.off('brushSelected');
      echartsInstance.on('brushSelected', (params: any) => {
        console.log('brushSelected', params);

        if (params.batch && params.batch[0].areas[0]) {
          const brushRange = params.batch[0].areas[0].coordRange;
          const startIndex = brushRange[0];

          const endIndex = brushRange[1];

          if (startIndex >= 0 && endIndex < liquidityDist.length) {
            const startPrice = liquidityDist[startIndex].price;
            const endPrice = liquidityDist[endIndex].price;
            setLowerPrice(startPrice);
            setUpperPrice(endPrice);
            setLowerTick(liquidityDist[endIndex].tickIndex);
            setUpperTcik(liquidityDist[startIndex].tickIndex);
            onRangeChanged &&
              onRangeChanged(
                liquidityDist[endIndex].tickIndex,
                liquidityDist[startIndex].tickIndex,
              );
          }
        }
      });

      // 初始化 brush 区域
      const length = liquidityDist.length;
      const endIdx = findClosestTickIndex(liquidityDist, lowerTick);

      const startIdx = findClosestTickIndex(liquidityDist, upperTick);
      console.log('init endIdx', endIdx);
      console.log('init startIdx', startIdx);
      if (startIdx < endIdx && startIdx >= 0 && endIdx < length) {
        setLowerPrice(liquidityDist[startIdx].price);
        setUpperPrice(liquidityDist[endIdx].price);
        echartsInstance.dispatchAction({
          type: 'brush',
          areas: [
            {
              brushType: 'lineX',
              coordRange: [startIdx, endIdx],
              xAxisIndex: 0,
            },
          ],
        });
      }
    }
  }, [liquidityDist]);

  // useEffect(() => {
  //   if (typeof onPriceGetter === 'function') {
  //     onPriceGetter(() => {
  //       // 找到最接近 lowerPrice 的节点
  //       const upperNode = liquidityDist.reduce(
  //         (prev, curr) =>
  //           Math.abs(curr.price - lowerPrice) < Math.abs(prev.price - lowerPrice) ? curr : prev,
  //         liquidityDist[0],
  //       );
  //       // 找到最接近 upperPrice 的节点
  //       const lowerNode = liquidityDist.reduce(
  //         (prev, curr) =>
  //           Math.abs(curr.price - upperPrice) < Math.abs(prev.price - upperPrice) ? curr : prev,
  //         liquidityDist[0],
  //       );
  //       return { lowerNode, upperNode };
  //     });
  //   }
  // }, [lowerPrice, upperPrice, onPriceGetter, liquidityDist]);

  return (
    <div className={styles.container}>
      <div className="mb-2">selece deposit liquidity range</div>
      <div ref={chartRef} className={`${styles.chart} ${styles.chartContainer}`}>
        {isFetchingDist ? (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner} />
          </div>
        ) : liquidityDist.length === 0 ? (
          <div className="flex translate-y-32 justify-center">
            Cetus Is Currently Not Assessable
          </div>
        ) : (
          <ReactECharts
            ref={echartsRef}
            option={option}
            style={{
              width: '100%',
              height: '95%',
              margin: '0 auto',
            }}
          />
        )}
      </div>
      <div className={styles.rangePanel}>
        <div>
          <label className={styles.priceLabelTitle}>Min Price</label>
          <div className={styles.flexRowCenter}>
            <button onClick={priceHandlers.lower_price_decrement} className={styles.button}>
              -
            </button>
            <div className={styles.priceLabel}>
              {formatPriceLabel(lowerPrice, liquidityDist)}
              <span className={styles.priceLabelUnit}>
                {pool?.coinA.symbol ? ` ${pool?.coinA.symbol} per ${pool?.coinB.symbol}` : ''}
              </span>
            </div>

            <button onClick={priceHandlers.lower_price_increment} className={styles.button}>
              +
            </button>
          </div>
        </div>
        <div>
          <label className={styles.priceLabelTitle}>Max Price</label>
          <div className={styles.flexRowCenter}>
            <button onClick={priceHandlers.upper_price_decrement} className={styles.button}>
              -
            </button>
            <label className={styles.priceLabel}>
              {formatPriceLabel(upperPrice, liquidityDist)}
              <span className={styles.priceLabelUnit}>
                {pool?.coinA.symbol ? ` ${pool?.coinA.symbol} per ${pool?.coinB.symbol}` : ''}
              </span>
            </label>
            <button onClick={priceHandlers.upper_price_increment} className={styles.button}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
