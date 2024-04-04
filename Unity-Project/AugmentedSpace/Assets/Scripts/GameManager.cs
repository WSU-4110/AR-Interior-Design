using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void StartButtonClick()
    {
        #if UNITY_ANDROID && !UNITY_EDITOR
        Debug.Log("RNUnity || OnClickQuite || UNITY_ANDROID");
        AndroidJavaObject intentObject = new AndroidJavaObject("android.content.Intent");
        intentObject.Call<AndroidJavaObject>("putExtra", "callBackFromUnityToRN", "Hello From Unity!!!!");
        GetCurrentActivity().Call("setResult", -1, intentObject);
        GetCurrentActivity().Call("finish");
        #endif
    }
    public AndroidJavaObject GetIntent()
    {
        return GetCurrentActivity().Call<AndroidJavaObject>("getIntent");
    }
    public AndroidJavaObject GetCurrentActivity()
    {
        AndroidJavaClass UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
        return UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity");
    }
}
