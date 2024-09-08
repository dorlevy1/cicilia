import {useEffect, useState} from 'react';
import {db} from "@/confg/firebaseConfig.ts";
import {separateActiveDisabled} from "@/utils/utils.ts";
import {setUpdatePagination} from "@/store/slices/authorsSlice.ts";
import {useDispatch} from "react-redux";

interface PaginationOptions<T> {
    collection: string;
    orderByField: string;
    limit?: number;
    updatePagination?: boolean;
}

const usePagination = <T, >({collection, orderByField, limit = 10, updatePagination}: PaginationOptions<T>) => {
    const [data, setData] = useState<{ active: T[]; disabled: T[] }>({active: [], disabled: []});
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [load, setLoad] = useState(true);
    const dispatch = useDispatch()
    const fetchData = async (isLoadMore: boolean = false) => {
        setLoading(true);

        try {
            let query = db.collection(collection)
                .where('isActive', '==', true)
                .orderBy(orderByField)
                .limit(limit);

            if (lastVisible && isLoadMore) {
                query = query.startAfter(lastVisible);
            }

            const snapshot = await query.get();
            if (snapshot.empty) {
                setHasMoreData(false); // No more data to load
                setLoad(false)
                return;
            }

            const fetchedData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as T[];

            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setLastVisible(lastDoc);

            const separatedData = separateActiveDisabled(fetchedData);

            setData((prevData) => ({
                active: [...(prevData.active || []), ...(separatedData?.active || [])],
                disabled: [...(prevData.disabled || []), ...(separatedData?.disabled || [])],
            }));

            dispatch(setUpdatePagination(false))
        } catch (err) {
            console.error("Error fetching data:", err);
            setError('Error fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setData([])
        fetchData();
    }, [updatePagination]);

    const loadMore = () => {
        if (lastVisible && hasMoreData) {
            return fetchData(true);
        }
        setHasMoreData(false)
        setLoad(false)
    };

    return {data, loading, error, loadMore, load, hasMoreData};
};

export default usePagination;
