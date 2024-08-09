'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryScale } from 'chart.js';
import { Chart } from 'chart.js/auto';
import { getUrlHistoryApi, getUrlMetaApi } from '@/lib/apis/url';
import { GetUrlHistoryDto, GetUrlMetaDto } from '@/lib/apis/url/dto';
import { GetUrlHistoryResponse } from '@/lib/apis/url/response';
import Cookies from 'js-cookie';
import MainLayout from '@/components/page/layout';
import { HOSTING_URL } from '@/lib/apis/config';

Chart.register(CategoryScale);

const Statistics = () => {
  const [clickData, setClickData] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const shortUrl = searchParams.get('shorturl');
    const urlId = searchParams.get('url');
    if (!shortUrl || !urlId) {
      router.push('/mypage');
    }
  }, [router]);

  useEffect(() => {
    const accessToken = Cookies.get('token');
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const urlId = searchParams.get('url');
    const fetchData = async () => {
      try {
        const data: GetUrlHistoryDto = { urlId: parseInt(urlId ? urlId : '0') };
        const [urlHistory, clicks] = await getUrlHistoryApi(data);

        setClickData(urlHistory);
        setClicks(clicks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching click data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const processData = (data: Array<GetUrlHistoryResponse>) => {
    const clicksByDate = data.reduce(
      (acc: Record<string, number>, click: GetUrlHistoryResponse) => {
        const date = new Date(click.clickedTime).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {},
    );

    const labels = Object.keys(clicksByDate);
    const values = Object.values(clicksByDate);

    return {
      labels,
      datasets: [
        {
          label: 'Number of Clicks By Date',
          data: values,
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };
  };

  const chartData = processData(clickData);

  return (
    <MainLayout>
      <Suspense>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-4xl w-full bg-white p-8 rounded shadow-md">
            <h2 className="text-gray-600 text-2xl font-bold mb-6 text-center">
              URL Click Statistics
            </h2>
            <a
              href={`${HOSTING_URL}/${searchParams.get('shorturl')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm mb-6 font-bold hover:underline"
            >
              {`${HOSTING_URL}/${searchParams.get('shorturl')}`}
            </a>
            {loading ? <p>Loading...</p> : <Line data={chartData} />}
          </div>
        </div>
      </Suspense>
    </MainLayout>
  );
};

export default Statistics;
