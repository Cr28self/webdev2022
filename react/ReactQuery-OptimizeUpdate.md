

# 빠른 좋아요 기능 구현 react-query optimistic update


# optimistic update란

낙관적 업데이트로 서버업데이트시 UI에서도 어차피 업데이트 할것이란 (낙관적인) 가정으로 미리 UI를 업데이트 시켜주고 서버를 통해 검증을 받고 업데이트 Or 롤백하는 방식이다.

react-query를 쓰면서 장점이라 느낀 것 중 하나

```js
export const useLikeAdd = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  return useMutation(
    (product_id) =>
      axios.post("/api/like/create/", {
        product_id,
      }),
    {
      onMutate: (value) => {
        const oldUserData = queryClient.getQueryData(["user"]);

        if (oldUserData) {//라우팅시 쿼리증발함 이유 못찾음, 그래서 해준 조건문 
          queryClient.cancelQueries(["user"]); //왜 캔슬을 해줘야할까 이것도 약간 의문
          queryClient.setQueryData(["user"], (oldUserData) => {
            //쿼리에 낙관적으로 적용될 내용 추가로 세팅
            return { ...oldUserData, like: [...oldUserData.like, value] };
          });

          return () => queryClient.setQueryData(["user"], oldUserData);
          //에러에서 context로 받을 rollback할 함수
        }
      },
      onSettled: () => queryClient.invalidateQueries(["user"]),//끝나고 나면 user를 업데이트 시킨다
      onError: (err, values, rollback) => {
        if (rollback) {
          rollback();//에러시 롤백
        }
        if (err.response.status === 401) {
          router.push(`/signup?redirect=${router.asPath.slice(1) || ""}`);//401시 signup으로 이동
        } else {
          throw new Error(err)
        }
       
      },
    }
  );
};
```
